export enum GoogleFontVariant {
    Thin = "100",
    ThinItalic = "100italic",
    ExtraLight = "200",
    ExtraLightItalic = "200italic",
    Light = "300",
    LightItalic = "300italic",
    Regular = "400",
    RegularItalic = "400italic",
    Medium = "500",
    MediumItalic = "500italic",
    SemiBold = "600",
    SemiBoldItalic = "600italic",
    Bold = "700",
    BoldItalic = "700italic",
    ExtraBold = "800",
    ExtraBoldItalic = "800italic",
    Black = "900",
    BlackItalic = "900italic",
}

export type GoogleFontDisplay =
    | "auto"
    | "block"
    | "swap"
    | "fallback"
    | "optional";

export type GoogleFontSubset =
    | "latin"
    | "latin-ext"
    | "sinhala"
    | "greek"
    | "kannada"
    | "telugu"
    | "vietnamese"
    | "hebrew"
    | "cyrillic"
    | "cyrillic-ext"
    | "greek-ext"
    | "arabic"
    | "devanagari"
    | "khmer"
    | "tamil"
    | "thai"
    | "bengali"
    | "gujarati"
    | "oriya"
    | "malayalam"
    | "gurmukhi"
    | "korean"
    | "japanese"
    | "cherokee"
    | "tibetan"
    | "chinese-simplified"
    | "music"
    | "adlam"
    | "anatolian-hieroglyphs"
    | "armenian"
    | "avestan"
    | "balinese"
    | "bamum"
    | "bassa-vah"
    | "batak"
    | "bhaiksuki"
    | "brahmi"
    | "buginese"
    | "buhid"
    | "canadian-aboriginal"
    | "carian"
    | "caucasian-albanian"
    | "chakma"
    | "cham"
    | "coptic"
    | "cuneiform"
    | "cypriot"
    | "deseret"
    | "duployan"
    | "egyptian-hieroglyphs"
    | "elbasan"
    | "elymaic"
    | "georgian"
    | "glagolitic"
    | "gothic"
    | "grantha"
    | "gunjala-gondi"
    | "chinese-hongkong"
    | "hanifi-rohingya"
    | "hanunoo"
    | "hatran"
    | "imperial-aramaic"
    | "indic-siyaq-numbers"
    | "inscriptional-pahlavi"
    | "inscriptional-parthian"
    | "javanese"
    | "kaithi"
    | "kayah-li"
    | "kharoshthi"
    | "khojki"
    | "khudawadi"
    | "lao"
    | "lepcha"
    | "limbu"
    | "linear-a"
    | "linear-b"
    | "lisu"
    | "lycian"
    | "lydian"
    | "mahajani"
    | "mandaic"
    | "manichaean"
    | "marchen"
    | "masaram-gondi"
    | "math"
    | "mayan-numerals"
    | "medefaidrin"
    | "meroitic"
    | "miao"
    | "modi"
    | "mongolian"
    | "mro"
    | "multani"
    | "myanmar"
    | "nko"
    | "nabataean"
    | "new-tai-lue"
    | "newa"
    | "nushu"
    | "ogham"
    | "ol-chiki"
    | "old-hungarian"
    | "old-italic"
    | "old-north-arabian"
    | "old-permic"
    | "old-persian"
    | "old-sogdian"
    | "old-south-arabian"
    | "old-turkic"
    | "osage"
    | "osmanya"
    | "pahawh-hmong"
    | "palmyrene"
    | "pau-cin-hau"
    | "phags-pa"
    | "phoenician"
    | "psalter-pahlavi"
    | "rejang"
    | "runic"
    | "samaritan"
    | "saurashtra"
    | "sharada"
    | "shavian"
    | "siddham"
    | "sogdian"
    | "sora-sompeng"
    | "soyombo"
    | "sundanese"
    | "syloti-nagri"
    | "symbols"
    | "syriac"
    | "chinese-traditional"
    | "tagalog"
    | "tagbanwa"
    | "tai-le"
    | "tai-tham"
    | "tai-viet"
    | "takri"
    | "tamil-supplement"
    | "thaana"
    | "tifinagh"
    | "tirhuta"
    | "ugaritic"
    | "vai"
    | "wancho"
    | "warang-citi"
    | "yi"
    | "zanabazar-square"
    | "ahom"
    | "dogra"
    | "ethiopic"
    | "nyiakeng-puachue-hmong"
    | "tangut"
    | "yezidi";

export type GoogleFontEffect =
    | "none"
    | "3d-float"
    | "3d"
    | "anaglyph"
    | "brick-sign"
    | "canvas-print"
    | "crackle"
    | "decaying"
    | "destruction"
    | "distressed-wood"
    | "distressed"
    | "emboss"
    | "fire-animation"
    | "fire"
    | "fragile"
    | "grass"
    | "ice"
    | "mitosis"
    | "neon"
    | "outline"
    | "putting-green"
    | "scuffed-steel"
    | "shadow-multiple"
    | "splintered"
    | "static"
    | "stonewash"
    | "vintage"
    | "wallpaper";

export interface GoogleFontDefinition {
    family: string;
    variants: GoogleFontVariant[];
}