<script lang="ts">
import GoogleModule from "./google-module";

import type { GoogleFontDefinition, GoogleFontDisplay } from "./types";

export let font: GoogleFontDefinition = undefined;
export let fonts: GoogleFontDefinition[] = undefined;
export let display: GoogleFontDisplay = undefined;
export let text: string = undefined;

$: styleSheetUrl = GoogleModule.getStylesheet({
    font,
    fonts,
    settings: {
        display,
        text,
    },
});
</script>

<link rel="stylesheet" href="{styleSheetUrl}}" />
