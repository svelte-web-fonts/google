import GoogleModule from "../../src/lib/google-module";

describe("Google Module", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("buildFamilyQueryParam", () => {
        it("should return a valid query param", () => {
            const actual = GoogleModule.buildFamilyQueryParam({
                family: "Roboto",
                variants: ["100", "500"],
            });

            expect(actual).toBe("family=Roboto:ital,wght@0,100;0,500");
        });

        it("should replace spaces in family name with plus", () => {
            const actual = GoogleModule.buildFamilyQueryParam({
                family: "Roboto Condensed",
                variants: ["100", "200"],
            });

            expect(actual).toBe(
                "family=Roboto+Condensed:ital,wght@0,100;0,200",
            );
        });

        it("should make italic variants italic in query string", () => {
            const actual = GoogleModule.buildFamilyQueryParam({
                family: "Roboto",
                variants: ["100", "600italic"],
            });

            expect(actual).toBe("family=Roboto:ital,wght@0,100;1,600");
        });

        it("should throw without empty font variants", () => {
            expect(() => {
                GoogleModule.buildFamilyQueryParam({
                    family: "Roboto",
                    variants: [],
                });
            }).toThrow("Font variants are required");
        });
    });

    describe("applySettingsToUrl", () => {
        it("should return a valid url", () => {
            const actual = GoogleModule.applySettingsToUrl({
                url: "https://test.dev/dev",
                settings: {
                    display: "auto",
                    text: "bla",
                },
            });

            expect(actual).toBe("https://test.dev/dev?display=auto&text=bla");
        });

        it("should append to existing params", () => {
            const actual = GoogleModule.applySettingsToUrl({
                url: "https://test.dev/dev?display=auto",
                settings: {
                    text: "bla",
                },
            });

            expect(actual).toBe("https://test.dev/dev?display=auto&text=bla");
        });

        it("should appen a uri-encoded value", () => {
            const actual = GoogleModule.applySettingsToUrl({
                url: "https://test.dev/dev",
                settings: {
                    text: "some long test text",
                },
            });

            expect(actual).toBe(
                "https://test.dev/dev?text=some%20long%20test%20text",
            );
        });

        it("should command seperate array values", () => {
            const actual = GoogleModule.applySettingsToUrl({
                url: "https://test.dev/dev",
                settings: {
                    subset: ["arabic", "latin", "chinese-hongkong"],
                },
            });

            expect(actual).toBe(
                "https://test.dev/dev?subset=arabic,latin,chinese-hongkong",
            );
        });

        it("should seperate effects with pipes", () => {
            const actual = GoogleModule.applySettingsToUrl({
                url: "https://test.dev/dev",
                settings: {
                    effect: ["fire", "3d"],
                },
            });

            expect(actual).toBe("https://test.dev/dev?effect=fire|3d");
        });
    });

    describe("getStylesheet", () => {
        it("should throw when both font and fonts is provied", () => {
            expect(() => {
                GoogleModule.getStylesheet({
                    fonts: [
                        {
                            family: "Alef",
                            variants: ["100"],
                        },
                    ],
                    font: {
                        family: "Alike Angular",
                        variants: ["100"],
                    },
                });
            }).toThrow("fonts and font are mutually exclusive");
        });

        it("should throw when neither font or fonts is proviede", () => {
            expect(() => {
                GoogleModule.getStylesheet({});
            }).toThrow("fonts or font is required");
        });

        it("should throw if fonts is not an array", () => {
            expect(() => {
                GoogleModule.getStylesheet({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    fonts: "Roboto",
                });
            }).toThrow("fonts must be an array");
        });

        it("should get a single stylesheet if input contains font", () => {
            const getSingleStyleSheetSpy = jest.spyOn(
                GoogleModule,
                "getSingleStyleSheet",
            );
            const getMultipleStylesheetSpy = jest.spyOn(
                GoogleModule,
                "getMultipleStylesheet",
            );

            GoogleModule.getStylesheet({
                font: {
                    family: "Roboto",
                    variants: ["100", "500"],
                },
            });

            expect(getSingleStyleSheetSpy).toHaveBeenCalled();
            expect(getMultipleStylesheetSpy).not.toHaveBeenCalled();
        });

        it("should get a multi stylesheet if input contains fonts", () => {
            const getSingleStyleSheetSpy = jest.spyOn(
                GoogleModule,
                "getSingleStyleSheet",
            );
            const getMultipleStylesheetSpy = jest.spyOn(
                GoogleModule,
                "getMultipleStylesheet",
            );

            GoogleModule.getStylesheet({
                fonts: [
                    {
                        family: "Alegreya",
                        variants: ["100", "200"],
                    },
                ],
            });

            expect(getSingleStyleSheetSpy).not.toHaveBeenCalled();
            expect(getMultipleStylesheetSpy).toHaveBeenCalled();
        });
    });

    describe("getSingleStyleSheet", () => {
        it("should return a valid stylesheet url", () => {
            const actual = GoogleModule.getSingleStyleSheet({
                font: {
                    family: "Roboto",
                    variants: ["100", "500"],
                },
            });

            expect(actual).toBe(
                "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,500",
            );
        });
    });

    describe("getMultipleStylesheet", () => {
        it("should append all fonts to the url", () => {
            const actual = GoogleModule.getMultipleStylesheet({
                fonts: [
                    {
                        family: "Roboto",
                        variants: ["100", "500"],
                    },
                    {
                        family: "Roboto Condensed",
                        variants: ["100", "200"],
                    },
                ],
            });

            expect(actual).toBe(
                "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,500&family=Roboto+Condensed:ital,wght@0,100;0,200",
            );
        });

        it("should append all fonts to the url with settings", () => {
            const actual = GoogleModule.getMultipleStylesheet({
                fonts: [
                    {
                        family: "Roboto",
                        variants: ["100", "500"],
                    },
                    {
                        family: "Roboto Condensed",
                        variants: ["100", "200"],
                    },
                ],
                settings: {
                    text: "bla",
                },
            });

            expect(actual).toBe(
                "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,500&family=Roboto+Condensed:ital,wght@0,100;0,200&text=bla",
            );
        });
    });
});
