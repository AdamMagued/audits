import { describe, expect, it } from "vitest";
import {
	blendColors,
	compositeOverWhite,
	computeContrast,
	contrastRatio,
	extractBoxShadowColor,
	hasIndicatorContrast,
	parseColor,
	parseGradientColors,
	relativeLuminance,
} from "./contrast";

describe("parseColor", () => {
	it("parses 3-digit hex colors", () => {
		expect(parseColor("#fff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
		expect(parseColor("#000")).toEqual({ r: 0, g: 0, b: 0, a: 1 });
		expect(parseColor("#f00")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
	});

	it("parses 4-digit hex colors with alpha", () => {
		expect(parseColor("#ffff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
		const half = parseColor("#fff8");
		expect(half?.r).toBe(255);
		expect(half?.g).toBe(255);
		expect(half?.b).toBe(255);
		expect(half?.a).toBeCloseTo(0.533, 2);
	});

	it("parses 6-digit hex colors", () => {
		expect(parseColor("#0050ff")).toEqual({ r: 0, g: 80, b: 255, a: 1 });
		expect(parseColor("#ffffff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
	});

	it("parses 8-digit hex colors with alpha", () => {
		const half = parseColor("#00000080");
		expect(half?.r).toBe(0);
		expect(half?.g).toBe(0);
		expect(half?.b).toBe(0);
		expect(half?.a).toBeCloseTo(0.502, 2);
	});

	it("parses rgb and rgba colors", () => {
		expect(parseColor("rgb(0, 80, 255)")).toEqual({ r: 0, g: 80, b: 255, a: 1 });
		expect(parseColor("rgba(0, 80, 255, 0.5)")).toEqual({ r: 0, g: 80, b: 255, a: 0.5 });
		expect(parseColor("rgb(0 80 255 / 0.75)")).toEqual({ r: 0, g: 80, b: 255, a: 0.75 });
	});

	it("parses hsl and hsla colors", () => {
		expect(parseColor("hsl(0, 100%, 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
		expect(parseColor("hsla(120, 100%, 50%, 0.5)")).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
	});

	it("parses named colors", () => {
		expect(parseColor("white")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
		expect(parseColor("black")).toEqual({ r: 0, g: 0, b: 0, a: 1 });
		expect(parseColor("transparent")).toEqual({ r: 0, g: 0, b: 0, a: 0 });
		expect(parseColor("blue")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
	});

	it("returns null for invalid color strings", () => {
		expect(parseColor("")).toBeNull();
		expect(parseColor("not-a-color")).toBeNull();
	});
});

describe("relativeLuminance", () => {
	it("computes 1 for white and 0 for black", () => {
		expect(relativeLuminance(255, 255, 255)).toBe(1);
		expect(relativeLuminance(0, 0, 0)).toBe(0);
	});
});

describe("contrastRatio", () => {
	it("computes 21:1 for black and white", () => {
		const lumWhite = relativeLuminance(255, 255, 255);
		const lumBlack = relativeLuminance(0, 0, 0);
		expect(contrastRatio(lumWhite, lumBlack)).toBe(21);
		expect(contrastRatio(lumBlack, lumWhite)).toBe(21);
	});

	it("computes 1:1 for identical colors", () => {
		const lum = relativeLuminance(255, 255, 255);
		expect(contrastRatio(lum, lum)).toBe(1);
	});
});

describe("blendColors and compositeOverWhite", () => {
	it("blends semi-transparent colors over opaque backgrounds", () => {
		const fg = { r: 0, g: 0, b: 0, a: 0.5 };
		const bg = { r: 255, g: 255, b: 255, a: 1 };
		const blended = blendColors(fg, bg);
		expect(blended.r).toBe(128);
		expect(blended.g).toBe(128);
		expect(blended.b).toBe(128);
	});

	it("composites semi-transparent colors over default white canvas", () => {
		const fg = { r: 0, g: 0, b: 0, a: 0.5 };
		const composited = compositeOverWhite(fg);
		expect(composited).toEqual({ r: 128, g: 128, b: 128 });
	});

	it("preserves fully opaque colors when compositing over white", () => {
		const fg = { r: 10, g: 20, b: 30, a: 1 };
		expect(compositeOverWhite(fg)).toEqual({ r: 10, g: 20, b: 30 });
	});
});

describe("parseGradientColors", () => {
	it("extracts color stops from linear-gradient with direction", () => {
		const colors = parseGradientColors("linear-gradient(to right, #000 0%, #fff 100%)");
		expect(colors).toEqual(["#000", "#fff"]);
	});

	it("extracts color stops from linear-gradient with angle", () => {
		const colors = parseGradientColors("linear-gradient(90deg, rgb(0, 0, 0), rgb(255, 255, 255))");
		expect(colors).toEqual(["rgb(0, 0, 0)", "rgb(255, 255, 255)"]);
	});

	it("extracts multiple color stops", () => {
		const colors = parseGradientColors(
			"linear-gradient(to bottom, red, rgba(0, 0, 255, 0.5) 50%, #00ff00 100%)",
		);
		expect(colors).toEqual(["red", "rgba(0, 0, 255, 0.5)", "#00ff00"]);
	});

	it("extracts stops from radial-gradient", () => {
		const colors = parseGradientColors(
			"radial-gradient(circle at center, #ffffff 0%, #000000 100%)",
		);
		expect(colors).toEqual(["#ffffff", "#000000"]);
	});

	it("returns empty array for non-gradient strings", () => {
		expect(parseGradientColors("rgb(255, 255, 255)")).toEqual([]);
	});
});

describe("computeContrast and transparent/semi-transparent/gradient backgrounds", () => {
	it("computes 1:1 contrast for white indicator on white background", () => {
		const ratio = computeContrast("#fff", "rgb(255, 255, 255)");
		expect(ratio).toBeCloseTo(1, 2);
	});

	it("computes > 3:1 contrast for high-contrast colors", () => {
		const ratio = computeContrast("#0050ff", "#fff");
		expect(ratio).toBeGreaterThanOrEqual(3);
	});

	it("evaluates white indicator against transparent background (resolving to canvas white)", () => {
		const ratio = computeContrast("#fff", "transparent");
		expect(ratio).toBeCloseTo(1, 2);
	});

	it("evaluates dark indicator against transparent background (resolving to canvas white)", () => {
		const ratio = computeContrast("#000", "transparent");
		expect(ratio).toBe(21);
	});

	it("evaluates contrast against semi-transparent backgrounds", () => {
		// Semi-transparent black 50% over white canvas results in rgb(128, 128, 128)
		const ratioWhite = computeContrast("#fff", "rgba(0, 0, 0, 0.5)");
		expect(ratioWhite).toBeGreaterThanOrEqual(3.5);

		// An indicator similar to rgb(128, 128, 128) will have insufficient contrast
		const ratioGray = computeContrast("rgb(130, 130, 130)", "rgba(0, 0, 0, 0.5)");
		expect(ratioGray).toBeLessThan(3);
	});

	it("evaluates contrast against gradients, taking the worst-case (minimum) stop", () => {
		// Gradient goes from black to white. White indicator is high contrast against black but 1:1 against white
		const gradient = "linear-gradient(to right, rgb(0, 0, 0), rgb(255, 255, 255))";
		const ratioWhite = computeContrast("#fff", gradient);
		expect(ratioWhite).toBeCloseTo(1, 2);

		// Black indicator is 21:1 against white stop but 1:1 against black stop
		const ratioBlack = computeContrast("#000", gradient);
		expect(ratioBlack).toBeCloseTo(1, 2);

		// White indicator over a consistently dark gradient passes
		const darkGradient = "linear-gradient(to right, rgb(0, 0, 0), rgb(30, 30, 30))";
		const ratioDark = computeContrast("#fff", darkGradient);
		expect(ratioDark).toBeGreaterThanOrEqual(3);
	});

	it("evaluates gradients with semi-transparent stops over base background", () => {
		// Semi-transparent black over white canvas
		const gradient = "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))";
		const ratio = computeContrast("#fff", gradient);
		expect(ratio).toBeGreaterThanOrEqual(3);
	});
});

describe("hasIndicatorContrast", () => {
	it("returns false for sub-threshold indicators (< 3:1)", () => {
		expect(hasIndicatorContrast("#ffffff", "#ffffff")).toBe(false);
		expect(hasIndicatorContrast("rgb(250, 250, 250)", "rgb(255, 255, 255)")).toBe(false);
	});

	it("returns true for sufficient contrast (>= 3:1)", () => {
		expect(hasIndicatorContrast("#0050ff", "#ffffff")).toBe(true);
		expect(hasIndicatorContrast("#000000", "#ffffff")).toBe(true);
	});

	it("respects custom minRatio parameter", () => {
		// Contrast between #777 and #fff is ~4.5:1
		expect(hasIndicatorContrast("#777", "#fff", 3.0)).toBe(true);
		expect(hasIndicatorContrast("#777", "#fff", 7.0)).toBe(false);
	});

	it("returns true when color cannot be parsed so it avoids false negatives", () => {
		expect(hasIndicatorContrast("invalid-color", "#fff")).toBe(true);
	});
});

describe("extractBoxShadowColor", () => {
	it("extracts hex color from box-shadow", () => {
		expect(extractBoxShadowColor("0 0 0 3px #0050ff")).toBe("#0050ff");
	});

	it("extracts rgb color from box-shadow", () => {
		expect(extractBoxShadowColor("rgb(0, 80, 255) 0px 0px 3px 0px")).toBe("rgb(0, 80, 255)");
	});

	it("extracts named color from box-shadow", () => {
		expect(extractBoxShadowColor("0 0 4px blue")).toBe("blue");
	});

	it("returns null for none or empty", () => {
		expect(extractBoxShadowColor("none")).toBeNull();
		expect(extractBoxShadowColor("")).toBeNull();
	});
});
