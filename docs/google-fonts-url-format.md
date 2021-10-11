# Google Fonts URL Format

This document tries to explain how google font urls are formatted.

For brevity the base url for all of the following requests/queries is omitted. It should be `https://fonts.googleapis.com/css`

If weight values in this document have a trailing `i` it refers to the italic version of the font. Note: This does not apply in the API and is only used for clarity.

## Single Font - No options

?family=**{FONT_FAMILY}**

This will return the font with regular the weight (400) with all subsets.

Note: Spaces in font names are replaced with `+`

### Requesting a style

You can request a style of a font by following the family name with a `:` and one of these identifiers:

| Style       | Specifiers                                  | Example                  |
| ----------- | ------------------------------------------- | ------------------------ |
| italic      | italic or i                                 | ?family=Cantarell:italic |
| bold        | bold or b or a numerical weight such as 700 | ?family=Tangerine:700    |
| bold italic | bolditalic or bi                            | ?family=Roboto:bi        |

# Options

You can provide options after the family name. They follow this format.

_?family={FONT_FAMILY}:**{PATTER}@{WEIGHT}**_

## Pattern

The pattern describes the foramt of the weight. The keys must be sorted alphabetically (ital,wght). The weights must then follow this format.

## Non-Italic Pattern

The simplest pattern is `wght` which is the weight of the font.

_?family={FONT_FAMILY}:**wght**@{WEIGHT}_

In this case WEIGHT will be a semicolon-seperated list of numeric weights.

_?family={FONT_FAMILY}:wght@**100,300,400**..._

## Italic Pattern

When using italic variants the pattern contains a seperate parameter `ital`

_?family=Roboto:**ital**,wght@0,100;1,100_

## Display

[font-display](https://www.w3.org/TR/css-fonts-4/#font-display-desc) lets you control what happens while the font is unavailable. Specifying a value other than the default auto is usually appropriate.

Pass the desired value in the querystring display parameter:

_?family=Roboto&**display=swap**_

## Subets

You can also specify the `subset` parameter to request subsets of the font. The subsets are comma-seperated.

_?family=Roboto+Mono&**subset=greek,cyrillic**_

## Multiple fonts

You can supply multiple font query parameters with different weights

_**?family**=Roboto:wght@100 **&family**=Source+Sans+Pro:wght@300_

## Optimizing font requests

You can supply the text parameter to optmize the font for specific text.

_?family=Inconsolata&**text=Hello**_