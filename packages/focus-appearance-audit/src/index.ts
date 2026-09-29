export type { BrowserAdaptor, ElementRef, Rect } from "@a11y-pulse/browser-adaptor";
export type { FocusAppearanceOptions } from "./audit";
export { createFocusAppearanceAudit, runFocusAppearanceAudit } from "./audit";
export {
	computeContrast,
	contrastRatio,
	hasIndicatorContrast,
	parseColor,
	parseGradientColors,
	relativeLuminance,
} from "./contrast";
export type { FocusStyleCheckOptions, StyleSnapshot } from "./detection";
export { omitIdleStyleSnapshot, stylesIndicateFocus } from "./detection";
export type {
	DetectionMethod,
	FocusAppearanceResult,
	FocusElementResult,
	FocusFailureEvidence,
	IndicatorDetection,
} from "./result";
