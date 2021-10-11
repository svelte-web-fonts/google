import GoogleModule from "../../src/lib/google-module";
import { GoogleFontVariant } from "../../src/lib/types/common";

describe("Google Module", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(GoogleModule).toBeDefined();
    });

    describe("variants", () => {
        it("should handle one font variant on a single font", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400";
            const actual = GoogleModule.getStylesheet({
                family: "Roboto",
                variants: [GoogleFontVariant.Regular],
            });

            expect(actual).toEqual(expected);
        });

        it("should handle multiple font variant without italic on a single font", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400,700";
            const actual = GoogleModule.getStylesheet({
                family: "Roboto",
                variants: [GoogleFontVariant.Regular, GoogleFontVariant.Bold],
            });

            expect(actual).toEqual(expected);
        });

        it("should handle multiple mixed font variants on a single fon", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,300;1,400";
            const actual = GoogleModule.getStylesheet({
                family: "Roboto",
                variants: [
                    GoogleFontVariant.Bold,
                    GoogleFontVariant.LightItalic,
                    GoogleFontVariant.RegularItalic,
                ],
            });

            expect(actual).toEqual(expected);
        });

        it("should handle multiple fonts with a single font variant", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Roboto+Condensed:wght@400";
            const actual = GoogleModule.getStylesheet([
                {
                    family: "Roboto",
                    variants: [GoogleFontVariant.Regular],
                },
                {
                    family: "Roboto Condensed",
                    variants: [GoogleFontVariant.Regular],
                },
            ]);

            expect(actual).toEqual(expected);
        });

        it("should handle multiple fonts with multiple font variants", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,300;1,400&family=Roboto+Condensed:wght@400";
            const actual = GoogleModule.getStylesheet([
                {
                    family: "Roboto",
                    variants: [
                        GoogleFontVariant.Bold,
                        GoogleFontVariant.LightItalic,
                        GoogleFontVariant.RegularItalic,
                    ],
                },
                {
                    family: "Roboto Condensed",
                    variants: [GoogleFontVariant.Regular],
                },
            ]);

            expect(actual).toEqual(expected);
        });
    });

    describe("display property", () => {
        it("should not add anything if display is auto", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400";
            const actual = GoogleModule.getStylesheet(
                {
                    family: "Roboto",
                    variants: [GoogleFontVariant.Regular],
                },
                {
                    display: "auto",
                },
            );

            expect(actual).toEqual(expected);
        });

        it("should handle display property", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=fallback";
            const actual = GoogleModule.getStylesheet(
                {
                    family: "Roboto",
                    variants: [GoogleFontVariant.Regular],
                },
                {
                    display: "fallback",
                },
            );

            expect(actual).toEqual(expected);
        });
    });

    describe("effect property", () => {
        it("should not add anything if effect is set to none", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400";
            const actual = GoogleModule.getStylesheet(
                {
                    family: "Roboto",
                    variants: [GoogleFontVariant.Regular],
                },
                {
                    effect: "none",
                },
            );

            expect(actual).toEqual(expected);
        });

        it("should handle effect property", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400&effect=3d";
            const actual = GoogleModule.getStylesheet(
                {
                    family: "Roboto",
                    variants: [GoogleFontVariant.Regular],
                },
                {
                    effect: "3d",
                },
            );

            expect(actual).toEqual(expected);
        });
    });

    describe("text property", () => {
        it("should not add anything if text is empty", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400";
            const actual = GoogleModule.getStylesheet(
                {
                    family: "Roboto",
                    variants: [GoogleFontVariant.Regular],
                },
                {
                    text: "",
                },
            );

            expect(actual).toEqual(expected);
        });

        it("should handle text property", () => {
            const expected =
                "https://fonts.googleapis.com/css2?family=Roboto:wght@400&text=text";
            const actual = GoogleModule.getStylesheet(
                {
                    family: "Roboto",
                    variants: [GoogleFontVariant.Regular],
                },
                {
                    text: "text",
                },
            );

            expect(actual).toEqual(expected);
        });
    });
});
