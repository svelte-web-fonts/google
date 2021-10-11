import type {
    GoogleFontDefinition,
    GoogleFontDisplay,
    GoogleFontEffect,
    GoogleFontSubset,
    GoogleFontVariant,
} from "./types/common";

export interface GoogleFontSettings {
    display?: GoogleFontDisplay;
    subsets?: GoogleFontSubset[];
    effect?: GoogleFontEffect;
    text?: string;
}

export default class GoogleModule {
    static readonly baseUrl = `https://fonts.googleapis.com/css2`;

    private static isItalic(variant: GoogleFontVariant) {
        return variant.includes("italic");
    }

    private static getFamilyDefinition(
        definition: GoogleFontDefinition,
    ): string {
        const { family } = definition;

        const weights = GoogleModule.getFamilyWeights(definition);

        return `${family.replace(/ /g, "+")}:${weights}`;
    }

    private static getFamilyWeights(definition: GoogleFontDefinition): string {
        const { variants } = definition;

        const someItalic = variants.some(GoogleModule.isItalic);

        const pattern = someItalic ? "ital,wght" : "wght";

        const weights = variants
            .map((variant) => {
                if (someItalic) {
                    const italvalue = GoogleModule.isItalic(variant) ? 1 : 0;
                    const weight = variant.replace("italic", "");

                    return `${italvalue},${weight}`;
                }

                return variant;
            })
            .join(someItalic ? ";" : ",");

        return `${pattern}@${weights}`;
    }

    private static applyParamToUrl(url: string, param: string, value: string) {
        return `${url}&${param}=${encodeURIComponent(value)}`;
    }

    static getStylesheet(
        fonts: GoogleFontDefinition | GoogleFontDefinition[],
        {
            display = "auto",
            subsets = [],
            effect = "none",
            text = "",
        }: GoogleFontSettings = {},
    ): string {
        const _fonts = Array.isArray(fonts) ? fonts : [fonts];

        const families = _fonts
            .map(GoogleModule.getFamilyDefinition)
            .map((family, index: number) => {
                const prefix = index === 0 ? "?" : "&";
                return `${prefix}family=${family}`;
            })
            .join("");

        let url = `${GoogleModule.baseUrl}${families}`;

        if (display !== "auto") {
            url = GoogleModule.applyParamToUrl(url, "display", display);
        }

        if (subsets.length > 0) {
            const subsetsString = subsets.join(",");
            url = this.applyParamToUrl(url, "subset", subsetsString);
        }

        if (text) {
            url = this.applyParamToUrl(url, "text", text);
        }

        if (effect !== "none") {
            url = this.applyParamToUrl(url, "effect", effect);
        }

        return url;
    }
}
