<script lang="ts">
import GoogleModule from "./google-module";

import type { GoogleFontDefinition, GoogleFontDisplay } from "./types";

export let fonts: GoogleFontDefinition[];
export let display: GoogleFontDisplay = undefined;
export let text: string = undefined;

$: styleSheetUrl = GoogleModule.getMultipleStylesheet({
    fonts,
    settings: {
        display,
        text,
    },
});
</script>

<link rel="stylesheet" href="{styleSheetUrl}}" />
