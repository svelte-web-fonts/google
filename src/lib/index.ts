import type { GoogleFontVariant } from "./types/common";
import type { GoogleFontFamily } from "./types/families";

export type {
    GoogleFontDefinition,
    GoogleFontDisplay,
    GoogleFontEffect,
    GoogleFontSubset,
    GoogleFontVariant,
} from "./types/common";

export type { GoogleFontFamily } from "./types/families";

export type { GoogleFontSettings } from "./google-module";

export { default as default } from "./GoogleFont.svelte";

export function getFontStyle(
    family: GoogleFontFamily,
    variant: GoogleFontVariant,
): string {
    const weight = variant.replace("italic", "");
    const fontStyle = variant.includes("italic") ? "italic" : "normal";

    return `font-family: ${family}; font-weight: ${weight}; font-style: ${fontStyle}`;
}
