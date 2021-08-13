<script lang="ts">
import GoogleModule from "./google-module";

import type {
    GoogleFontDefinition,
    GoogleFontDisplay,
    GoogleFontEffect,
    GoogleFontSubset,
} from "./types";

export let font: GoogleFontDefinition = undefined;
export let fonts: GoogleFontDefinition[] = undefined;
export let display: GoogleFontDisplay = undefined;
export let subset: GoogleFontSubset | GoogleFontSubset[] = undefined;
export let effect: GoogleFontEffect | GoogleFontEffect[] = undefined;
export let text: string = undefined;

$: styleSheetUrl = GoogleModule.getStylesheet({
    font,
    fonts,
    settings: {
        display,
        text,
        effect,
        subset,
    },
});
</script>

<link rel="stylesheet" href="{styleSheetUrl}}" />
