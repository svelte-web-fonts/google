# @svelte-web-fonts/google

<p align="center">
    <img src="https://raw.githubusercontent.com/SvelteWebFonts/google/main/assets/Project-Logo.png" width="128"/>
    <h1 align="center">Easily include Google Fonts in your svelte project.</h1>
</p>

![workflow](https://github.com/SvelteWebFonts/google/actions/workflows/node.js.yml/badge.svg)

## Installation

```bash
npm install @svelte-web-fonts/google
```

or

```bash
yarn add @svelte-web-fonts/google
```

## Usage

Use the "GoogleFont" component to create a stylesheet to include Google Fonts.

Note: Use `<svelte:head>` to add the stylesheet to the head of your HTML.

### With Typescript (recommended)

```html
<script lang="ts">
    import GoogleFont from "@svelte-web-fonts/google";
    import type { GoogleFontDefinition } from "@svelte-web-fonts/google";

    const font: GoogleFontDefinition = {
        family: "Roboto",
        variants: ["400"],
    };
</script>

<svelte:head>
    <GoogleFont {font}></GoogleFont>
</svelte:head>
```

<summary>
Without Typescript

<details>

```html
<script>
    import GoogleFont from "@svelte-web-fonts/google";

    const font = {
        family: "Roboto",
        variants: ["400"],
    };
</script>

<svelte:head>
    <GoogleFont {font}></GoogleFont>
</svelte:head>
```

</details>
</sumamry>

## Multiple fonts

```html
<script lang="ts">
    import GoogleFont from "@svelte-web-fonts/google";
    import type { GoogleFontDefinition } from "@svelte-web-fonts/google";

    const fonts: GoogleFontDefinition[] = [
        {
            family: "Style Script",
            variants: ["400"],
        },
        {
            family: "Hahmlet",
            variants: ["200", "300"],
        },
    ];
</script>

<svelte:head>
    <GoogleFont {fonts}></GoogleFont>
</svelte:head>
```

## Font Options

All array options (ending with []) also accept a single value.

### **display**

[font-display](https://developers.google.com/fonts/docs/getting_started#use_font-display) lets you control what happens while the font is unavailable. Specifying a value other than the default auto is usually appropriate.

#### Available options

"auto" | "block" | "swap" | "fallback" | "optional"

### **subsets[]**

Some of the fonts in the Google Font Directory support multiple subsets (like Latin, Cyrillic, and Greek for example). Look for the available subsets for your font family on Google Fonts.

[More information](https://developers.google.com/fonts/docs/getting_started#specifying_script_subsets)

### **text**

Oftentimes, when you want to use a web font on your website or application, you know in advance which letters you'll need. This often occurs when you're using a web font in a logo or heading.

In these cases, you should consider specifying a text value

[More information](https://developers.google.com/fonts/docs/getting_started#optimizing_your_font_requests)

### **effects[]**

When making headers or display texts on your website, you'll often want to stylize your text in a decorative way. To simplify your work, Google has provided a collection of font effects that you can use with minimal effort to produce beautiful display text

The text you apply the font to, needs a specific class, for the effect to work. The format is `.font-effect-NAME`, where NAME is the name of the effect.

[More information](https://developers.google.com/fonts/docs/getting_started#enabling_font_effects_beta)
