import { get } from "https";
import { promises as fs } from "fs";
import path = require("path");

const GOOGLE_FONTS_API_KEY = process.env.GOOGLE_FONTS_API_KEY;

if (!GOOGLE_FONTS_API_KEY) {
    throw new Error("GOOGLE_FONTS_API_KEY is not set");
}

export interface GoogleFontItem {
    family: string;
    variants: string[];
    subsets: string[];
    version: string;
    lastModified: string;
    files: {
        regular: string;
        italic: string;
    };
    category: string;
    kind: string;
}

const googleFontDisplayTypes = [
    "auto",
    "block",
    "swap",
    "fallback",
    "optional",
];

const allFontVariants = [
    "100",
    "100italic",
    "200",
    "200italic",
    "300",
    "300italic",
    "400",
    "400italic",
    "500",
    "500italic",
    "600",
    "600italic",
    "700",
    "700italic",
    "800",
    "800italic",
    "900",
    "900italic",
];

const fontEffects = [
    "3d-float",
    "3d",
    "anaglyph",
    "brick-sign",
    "canvas-print",
    "crackle",
    "decaying",
    "destruction",
    "distressed-wood",
    "distressed",
    "emboss",
    "fire-animation",
    "fire",
    "fragile",
    "grass",
    "ice",
    "mitosis",
    "neon",
    "outline",
    "putting-green",
    "scuffed-steel",
    "shadow-multiple",
    "splintered",
    "static",
    "stonewash",
    "vintage",
    "wallpaper",
];

async function fetchFonts(): Promise<GoogleFontItem[]> {
    const requestUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`;

    return new Promise((resolve, reject) => {
        get(requestUrl, (resp) => {
            let data = "";

            resp.on("data", (chunk) => {
                data += chunk;
            });

            resp.on("end", () => {
                const responseData = JSON.parse(data);
                resolve(responseData.items);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}

function createType(name: string, entries: string[]) {
    return `export type ${name} = ${entries.map((e) => `"${e}"`).join("|")}`;
}

function createTypes(fonts: GoogleFontItem[]): string {
    const fontFamilyDefinitionType = `export interface GoogleFontDefinition {
        family: GoogleFontFamily;
        variants: GoogleFontVariant[];
    }`;

    const allFontDisplayType = createType(
        "GoogleFontDisplay",
        googleFontDisplayTypes,
    );

    const subsets = fonts.reduce((acc, font) => {
        font.subsets.forEach((subset) => {
            if (!acc.includes(subset)) {
                acc.push(subset);
            }
        });
        return acc;
    }, []);

    const subsetsType = createType("GoogleFontSubset", subsets);

    const fontVariantTypes = createType("GoogleFontVariant", allFontVariants);

    const allFontVariantsArray = `export const ALL_FONT_VARIANTS: GoogleFontVariant[] = [${allFontVariants
        .map((v) => `"${v}"`)
        .join(",")}]`;

    const fontEffectsType = createType("GoogleFontEffect", fontEffects);

    const allFontFamilies = fonts.map((font) => font.family).sort();

    const fontFamilyTypes = createType("GoogleFontFamily", allFontFamilies);

    return [
        fontFamilyDefinitionType,
        allFontDisplayType,
        fontVariantTypes,
        subsetsType,
        fontEffectsType,
        allFontVariantsArray,
        fontFamilyTypes,
    ].join("\n\n");
}

function writeTypes(typesContent: string) {
    return fs.writeFile(
        path.join(__dirname, "..", "lib", "types.ts"),
        typesContent,
    );
}

fetchFonts().then(createTypes).then(writeTypes);
