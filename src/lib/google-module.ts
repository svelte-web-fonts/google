import type {
    GoogleFontDisplay,
    GoogleFontDefinition,
    GoogleFontSubset,
    GoogleFontEffect,
} from "./types";

export interface GoogleFontSettings {
    display?: GoogleFontDisplay;
    text?: string;
    subset?: GoogleFontSubset[] | GoogleFontSubset;
    effect?: GoogleFontEffect[] | GoogleFontEffect;
}

export default class GoogleModule {
    static readonly baseUrl = `https://fonts.googleapis.com/css2`;

    static buildFamilyQueryParam({
        family,
        variants,
    }: GoogleFontDefinition): string {
        if (!variants || variants.length === 0) {
            throw new Error("Font variants are required");
        }

        const familyQueryParam = family.replace(/ /g, "+");
        const variantsParam = variants
            .sort()
            .map((variant) => {
                const isItalic = variant.endsWith("italic");

                const italicPrefix = isItalic ? "1" : "0";

                const variantWeight = isItalic ? variant.slice(0, -6) : variant;

                return `${italicPrefix},${variantWeight}`;
            })
            .join(";");

        return `family=${familyQueryParam}:ital,wght@${variantsParam}`;
    }

    static applySettingsToUrl({
        url,
        settings,
    }: {
        url: string;
        settings?: GoogleFontSettings;
    }): string {
        let newUrl = url;

        Object.entries(settings).forEach(([key, value]) => {
            const isFirstParam = !newUrl.includes("?");
            const prefix = isFirstParam ? "?" : "&";

            const encodedKey = encodeURIComponent(key);

            const separator = key === "effect" ? "|" : ",";
            const encodedValue = Array.isArray(value)
                ? value.map(encodeURIComponent).join(separator)
                : encodeURIComponent(value);

            newUrl += `${prefix}${encodedKey}=${encodedValue}`;
        });

        return newUrl;
    }

    static getStylesheet({
        font,
        fonts,
        settings = {},
    }: {
        font?: GoogleFontDefinition;
        fonts?: GoogleFontDefinition[];
        settings?: GoogleFontSettings;
    }): string {
        if (!font && !fonts) {
            throw new Error("fonts or font is required");
        }

        if (font && fonts) {
            throw new Error("fonts and font are mutually exclusive");
        }

        if (fonts) {
            if (!Array.isArray(fonts)) {
                throw new Error("fonts must be an array");
            }

            return this.getMultipleStylesheet({
                fonts,
                settings,
            });
        }

        return this.getSingleStyleSheet({ font, settings });
    }

    static getSingleStyleSheet({
        font,
        settings = {},
    }: {
        font: GoogleFontDefinition;
        settings?: GoogleFontSettings;
    }): string {
        const familyQueryParam = this.buildFamilyQueryParam(font);

        return this.applySettingsToUrl({
            url: `${this.baseUrl}?${familyQueryParam}`,
            settings,
        });
    }

    static getMultipleStylesheet({
        fonts,
        settings = {},
    }: {
        fonts: GoogleFontDefinition[];
        settings?: GoogleFontSettings;
    }): string {
        const familyQueryParams = fonts.map(this.buildFamilyQueryParam);

        return this.applySettingsToUrl({
            url: `${this.baseUrl}?${familyQueryParams.join("&")}`,
            settings,
        });
    }
}
