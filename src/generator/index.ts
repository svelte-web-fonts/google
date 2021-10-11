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

function createTypes(fonts: GoogleFontItem[]): string {
    const allFontFamilies = fonts.map((font) => font.family).sort();

    return `export type GoogleFontFamily = ${allFontFamilies
        .map((e) => `"${e}"`)
        .join("|")}`;
}

function writeTypes(typesContent: string) {
    return fs.writeFile(
        path.join(__dirname, "..", "lib", "types.ts"),
        typesContent,
    );
}

fetchFonts().then(createTypes).then(writeTypes);
