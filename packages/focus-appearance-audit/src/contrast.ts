export type RGBA = { r: number; g: number; b: number; a: number };

export const DEFAULT_MIN_CONTRAST_RATIO = 3.0;

const NAMED_COLORS: Record<string, [number, number, number]> = {
	aliceblue: [240, 248, 255],
	antiquewhite: [250, 235, 215],
	aqua: [0, 255, 255],
	aquamarine: [127, 255, 212],
	azure: [240, 255, 255],
	beige: [245, 245, 220],
	bisque: [255, 228, 196],
	black: [0, 0, 0],
	blanchedalmond: [255, 235, 205],
	blue: [0, 0, 255],
	blueviolet: [138, 43, 226],
	brown: [165, 42, 42],
	burlywood: [222, 184, 135],
	cadetblue: [95, 158, 160],
	chartreuse: [127, 255, 0],
	chocolate: [210, 105, 30],
	coral: [255, 127, 80],
	cornflowerblue: [100, 149, 237],
	cornsilk: [255, 248, 220],
	crimson: [220, 20, 60],
	cyan: [0, 255, 255],
	darkblue: [0, 0, 139],
	darkcyan: [0, 139, 139],
	darkgoldenrod: [184, 134, 11],
	darkgray: [169, 169, 169],
	darkgrey: [169, 169, 169],
	darkgreen: [0, 100, 0],
	darkkhaki: [189, 183, 107],
	darkmagenta: [139, 0, 139],
	darkolivegreen: [85, 107, 47],
	darkorange: [255, 140, 0],
	darkorchid: [153, 50, 204],
	darkred: [139, 0, 0],
	darksalmon: [233, 150, 122],
	darkseagreen: [143, 188, 143],
	darkslateblue: [72, 61, 139],
	darkslategray: [47, 79, 79],
	darkslategrey: [47, 79, 79],
	darkturquoise: [0, 206, 209],
	darkviolet: [148, 0, 211],
	deeppink: [255, 20, 147],
	deepskyblue: [0, 191, 255],
	dimgray: [105, 105, 105],
	dimgrey: [105, 105, 105],
	dodgerblue: [30, 144, 255],
	firebrick: [178, 34, 34],
	floralwhite: [255, 250, 240],
	forestgreen: [34, 139, 34],
	fuchsia: [255, 0, 255],
	gainsboro: [220, 220, 220],
	ghostwhite: [248, 248, 255],
	gold: [255, 215, 0],
	goldenrod: [218, 165, 32],
	gray: [128, 128, 128],
	grey: [128, 128, 128],
	green: [0, 128, 0],
	greenyellow: [173, 255, 47],
	honeydew: [240, 255, 240],
	hotpink: [255, 105, 180],
	indianred: [205, 92, 92],
	indigo: [75, 0, 130],
	ivory: [255, 255, 240],
	khaki: [240, 230, 140],
	lavender: [230, 230, 250],
	lavenderblush: [255, 240, 245],
	lawngreen: [124, 252, 0],
	lemonchiffon: [255, 250, 205],
	lightblue: [173, 216, 230],
	lightcoral: [240, 128, 128],
	lightcyan: [224, 255, 255],
	lightgoldenrodyellow: [250, 250, 210],
	lightgray: [211, 211, 211],
	lightgrey: [211, 211, 211],
	lightgreen: [144, 238, 144],
	lightpink: [255, 182, 193],
	lightsalmon: [255, 160, 122],
	lightseagreen: [32, 178, 170],
	lightskyblue: [135, 206, 250],
	lightslategray: [119, 136, 153],
	lightslategrey: [119, 136, 153],
	lightsteelblue: [176, 196, 222],
	lightyellow: [255, 255, 224],
	lime: [0, 255, 0],
	limegreen: [50, 205, 50],
	linen: [250, 240, 230],
	magenta: [255, 0, 255],
	maroon: [128, 0, 0],
	mediumaquamarine: [102, 205, 170],
	mediumblue: [0, 0, 205],
	mediumorchid: [186, 85, 211],
	mediumpurple: [147, 112, 219],
	mediumseagreen: [60, 179, 113],
	mediumslateblue: [123, 104, 238],
	mediumspringgreen: [0, 250, 154],
	mediumturquoise: [72, 209, 204],
	mediumvioletred: [199, 21, 133],
	midnightblue: [25, 25, 112],
	mintcream: [245, 255, 250],
	mistyrose: [255, 228, 225],
	moccasin: [255, 228, 181],
	navajowhite: [255, 222, 173],
	navy: [0, 0, 128],
	oldlace: [253, 245, 230],
	olive: [128, 128, 0],
	olivedrab: [107, 142, 35],
	orange: [255, 165, 0],
	orangered: [255, 69, 0],
	orchid: [218, 112, 214],
	palegoldenrod: [238, 232, 170],
	palegreen: [152, 251, 152],
	paleturquoise: [175, 238, 238],
	palevioletred: [219, 112, 147],
	papayawhip: [255, 239, 213],
	peachpuff: [255, 218, 185],
	peru: [205, 133, 63],
	pink: [255, 192, 203],
	plum: [221, 160, 221],
	powderblue: [176, 224, 230],
	purple: [128, 0, 128],
	rebeccapurple: [102, 51, 153],
	red: [255, 0, 0],
	rosybrown: [188, 143, 143],
	royalblue: [65, 105, 225],
	saddlebrown: [139, 69, 19],
	salmon: [250, 128, 114],
	sandybrown: [244, 164, 96],
	seagreen: [46, 139, 87],
	seashell: [255, 245, 238],
	sienna: [160, 82, 45],
	silver: [192, 192, 192],
	skyblue: [135, 206, 235],
	slateblue: [106, 90, 205],
	slategray: [112, 128, 144],
	slategrey: [112, 128, 144],
	snow: [255, 250, 250],
	springgreen: [0, 255, 127],
	steelblue: [70, 130, 180],
	tan: [210, 180, 140],
	teal: [0, 128, 128],
	thistle: [216, 191, 216],
	tomato: [255, 99, 71],
	turquoise: [64, 224, 208],
	violet: [238, 130, 238],
	wheat: [245, 222, 179],
	white: [255, 255, 255],
	whitesmoke: [245, 245, 245],
	yellow: [255, 255, 0],
	yellowgreen: [154, 205, 50],
};

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
	const normalizedH = ((h % 360) + 360) % 360;
	const clampedS = Math.max(0, Math.min(1, s));
	const clampedL = Math.max(0, Math.min(1, l));
	const c = (1 - Math.abs(2 * clampedL - 1)) * clampedS;
	const x = c * (1 - Math.abs(((normalizedH / 60) % 2) - 1));
	const m = clampedL - c / 2;
	let r = 0;
	let g = 0;
	let b = 0;

	if (normalizedH < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (normalizedH < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (normalizedH < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (normalizedH < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (normalizedH < 300) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}

	return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

export function parseColor(raw: string): RGBA | null {
	const str = raw.trim().toLowerCase();
	if (!str) {
		return null;
	}

	if (str === "transparent") {
		return { r: 0, g: 0, b: 0, a: 0 };
	}

	const named = NAMED_COLORS[str];
	if (named) {
		return { r: named[0], g: named[1], b: named[2], a: 1 };
	}

	if (str.startsWith("#")) {
		const hex = str.slice(1);
		if (hex.length === 3) {
			const h0 = hex.charAt(0);
			const h1 = hex.charAt(1);
			const h2 = hex.charAt(2);
			const r = Number.parseInt(h0 + h0, 16);
			const g = Number.parseInt(h1 + h1, 16);
			const b = Number.parseInt(h2 + h2, 16);
			return { r, g, b, a: 1 };
		}
		if (hex.length === 4) {
			const h0 = hex.charAt(0);
			const h1 = hex.charAt(1);
			const h2 = hex.charAt(2);
			const h3 = hex.charAt(3);
			const r = Number.parseInt(h0 + h0, 16);
			const g = Number.parseInt(h1 + h1, 16);
			const b = Number.parseInt(h2 + h2, 16);
			const a = Number.parseInt(h3 + h3, 16) / 255;
			return { r, g, b, a };
		}
		if (hex.length === 6) {
			const r = Number.parseInt(hex.slice(0, 2), 16);
			const g = Number.parseInt(hex.slice(2, 4), 16);
			const b = Number.parseInt(hex.slice(4, 6), 16);
			return { r, g, b, a: 1 };
		}
		if (hex.length === 8) {
			const r = Number.parseInt(hex.slice(0, 2), 16);
			const g = Number.parseInt(hex.slice(2, 4), 16);
			const b = Number.parseInt(hex.slice(4, 6), 16);
			const a = Number.parseInt(hex.slice(6, 8), 16) / 255;
			return { r, g, b, a };
		}
		return null;
	}

	const rgbMatch = str.match(
		/^rgba?\(\s*([\d.]+%?)\s*[, ]\s*([\d.]+%?)\s*[, ]\s*([\d.]+%?)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/,
	);
	if (
		rgbMatch &&
		rgbMatch[1] !== undefined &&
		rgbMatch[2] !== undefined &&
		rgbMatch[3] !== undefined
	) {
		const parseChannel = (val: string): number => {
			if (val.endsWith("%")) {
				return Math.round((Number.parseFloat(val) / 100) * 255);
			}
			return Math.round(Number.parseFloat(val));
		};
		const parseAlpha = (val: string | undefined): number => {
			if (val === undefined) {
				return 1;
			}
			if (val.endsWith("%")) {
				return Number.parseFloat(val) / 100;
			}
			return Number.parseFloat(val);
		};

		const r = Math.max(0, Math.min(255, parseChannel(rgbMatch[1])));
		const g = Math.max(0, Math.min(255, parseChannel(rgbMatch[2])));
		const b = Math.max(0, Math.min(255, parseChannel(rgbMatch[3])));
		const a = Math.max(0, Math.min(1, parseAlpha(rgbMatch[4])));
		return { r, g, b, a };
	}

	const hslMatch = str.match(
		/^hsla?\(\s*([\d.]+(?:deg|rad|turn)?)\s*[, ]\s*([\d.]+%)\s*[, ]\s*([\d.]+%)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/,
	);
	if (
		hslMatch &&
		hslMatch[1] !== undefined &&
		hslMatch[2] !== undefined &&
		hslMatch[3] !== undefined
	) {
		let h = Number.parseFloat(hslMatch[1]);
		if (hslMatch[1].endsWith("turn")) {
			h = Number.parseFloat(hslMatch[1]) * 360;
		} else if (hslMatch[1].endsWith("rad")) {
			h = (Number.parseFloat(hslMatch[1]) * 180) / Math.PI;
		}
		const s = Number.parseFloat(hslMatch[2]) / 100;
		const l = Number.parseFloat(hslMatch[3]) / 100;
		const parseAlpha = (val: string | undefined): number => {
			if (val === undefined) {
				return 1;
			}
			if (val.endsWith("%")) {
				return Number.parseFloat(val) / 100;
			}
			return Number.parseFloat(val);
		};
		const a = Math.max(0, Math.min(1, parseAlpha(hslMatch[4])));
		const [r, g, b] = hslToRgb(h, s, l);
		return { r, g, b, a };
	}

	return null;
}

export function blendColors(fg: RGBA, bg: RGBA): RGBA {
	const a = fg.a + bg.a * (1 - fg.a);
	if (a === 0) {
		return { r: 0, g: 0, b: 0, a: 0 };
	}
	const r = Math.round((fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a);
	const g = Math.round((fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a);
	const b = Math.round((fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a);
	return { r, g, b, a };
}

export function compositeOverWhite(color: RGBA): { r: number; g: number; b: number } {
	if (color.a >= 1) {
		return { r: color.r, g: color.g, b: color.b };
	}
	return {
		r: Math.round(color.r * color.a + 255 * (1 - color.a)),
		g: Math.round(color.g * color.a + 255 * (1 - color.a)),
		b: Math.round(color.b * color.a + 255 * (1 - color.a)),
	};
}

export function relativeLuminance(r: number, g: number, b: number): number {
	const channel = (v: number): number => {
		const c = v / 255;
		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(lum1: number, lum2: number): number {
	const lighter = Math.max(lum1, lum2);
	const darker = Math.min(lum1, lum2);
	return (lighter + 0.05) / (darker + 0.05);
}

function splitTopLevelCommas(str: string): string[] {
	const result: string[] = [];
	let current = "";
	let depth = 0;

	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		if (char === "(") {
			depth++;
			current += char;
		} else if (char === ")") {
			depth--;
			current += char;
		} else if (char === "," && depth === 0) {
			result.push(current.trim());
			current = "";
		} else {
			current += char;
		}
	}
	if (current.trim()) {
		result.push(current.trim());
	}
	return result;
}

export function parseGradientColors(gradientCss: string): string[] {
	const match = gradientCss.match(
		/(?:linear|radial|conic|repeating-linear|repeating-radial|repeating-conic)-gradient\((.*)\)/s,
	);
	if (!match || match[1] === undefined) {
		return [];
	}

	const parts = splitTopLevelCommas(match[1]);
	const colors: string[] = [];

	for (const part of parts) {
		const trimmed = part.trim();
		// Skip direction, angle, shape, or position arguments
		if (
			trimmed.startsWith("to ") ||
			/^[-\d.]+(?:deg|rad|turn|grad)/i.test(trimmed) ||
			/^(?:circle|ellipse|at )/i.test(trimmed)
		) {
			continue;
		}

		// Find color token in part (e.g. "rgb(0, 0, 0) 100%" or "#fff 50%" or "white")
		const colorMatch = trimmed.match(
			/(?:rgba?\([^)]+\)|hsla?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/,
		);
		if (colorMatch && parseColor(colorMatch[0]) !== null) {
			colors.push(colorMatch[0]);
		}
	}

	return colors;
}

export function extractBoxShadowColor(shadowStr: string): string | null {
	const trimmed = shadowStr.trim();
	if (!trimmed || trimmed === "none") {
		return null;
	}

	const match = trimmed.match(
		/(?:rgba?\([^)]+\)|hsla?\([^)]+\)|#[0-9a-fA-F]{3,8}|(?:^|\s+)([a-zA-Z]+)(?=\s|$))/,
	);
	if (match) {
		const candidate = match[1] ?? match[0];
		if (parseColor(candidate) !== null) {
			return candidate;
		}
	}
	return null;
}

export function computeContrast(fgStr: string, bgStr: string): number | null {
	const fg = parseColor(fgStr);
	if (!fg) {
		return null;
	}

	// Check if background contains gradient
	if (bgStr.includes("-gradient(")) {
		const gradientColors = parseGradientColors(bgStr);
		if (gradientColors.length === 0) {
			return null;
		}

		// Check for underlying background color after or outside the gradient
		const outsideGradient = bgStr.replace(
			/(?:linear|radial|conic|repeating-linear|repeating-radial|repeating-conic)-gradient\([^)]*\)/g,
			"",
		);
		const baseBgColor = parseColor(outsideGradient) ?? { r: 255, g: 255, b: 255, a: 1 };
		const baseOpaqueBg = compositeOverWhite(baseBgColor);

		const ratios: number[] = [];
		for (const stopStr of gradientColors) {
			const stopColor = parseColor(stopStr);
			if (!stopColor) {
				continue;
			}
			const blendedStop =
				stopColor.a < 1 ? blendColors(stopColor, { ...baseOpaqueBg, a: 1 }) : stopColor;
			const finalStop = compositeOverWhite(blendedStop);
			const finalFg = fg.a < 1 ? blendColors(fg, { ...finalStop, a: 1 }) : fg;
			const opaqueFg = compositeOverWhite(finalFg);

			const lumFg = relativeLuminance(opaqueFg.r, opaqueFg.g, opaqueFg.b);
			const lumBg = relativeLuminance(finalStop.r, finalStop.g, finalStop.b);
			ratios.push(contrastRatio(lumFg, lumBg));
		}

		if (ratios.length === 0) {
			return null;
		}
		return Math.min(...ratios);
	}

	const bg = parseColor(bgStr);
	if (!bg) {
		return null;
	}

	const opaqueBg = compositeOverWhite(bg);
	const blendedFg = fg.a < 1 ? blendColors(fg, { ...opaqueBg, a: 1 }) : fg;
	const opaqueFg = compositeOverWhite(blendedFg);

	const lumFg = relativeLuminance(opaqueFg.r, opaqueFg.g, opaqueFg.b);
	const lumBg = relativeLuminance(opaqueBg.r, opaqueBg.g, opaqueBg.b);
	return contrastRatio(lumFg, lumBg);
}

export function hasIndicatorContrast(
	indicatorColor: string,
	effectiveBackground: string,
	minRatio = DEFAULT_MIN_CONTRAST_RATIO,
): boolean {
	const ratio = computeContrast(indicatorColor, effectiveBackground);
	if (ratio === null) {
		// If contrast cannot be determined, do not fail it on contrast check
		return true;
	}
	return ratio >= minRatio;
}
