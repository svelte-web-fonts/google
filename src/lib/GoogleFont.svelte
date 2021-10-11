<script lang="ts">
import type {
    GoogleFontDefinition,
    GoogleFontDisplay,
    GoogleFontEffect,
    GoogleFontSubset,
} from "./types/common";
import GoogleModule from "./google-module";

export let font: GoogleFontDefinition = null;
export let fonts: GoogleFontDefinition[] = null;

export let display: GoogleFontDisplay = "auto";
export let effect: GoogleFontEffect = "none";
export let subsets: GoogleFontSubset[] = [];
export let text: string = "";

$: styleSheetUrl = GoogleModule.getStylesheet(font ?? fonts, {
    display,
    subsets,
    effect,
    text,
});
</script>

<slot styleSheetUrl="{styleSheetUrl}">
    <link rel="stylesheet" href="{styleSheetUrl}" />
</slot>
