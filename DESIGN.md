## Design guidelines for video graphics

Theme extracted from `/Users/mdhussain/learning/bwh-video`.

### Colors

Primary palette is **indigo**.

#### Indigo scale
| Token | Hex |
| --- | --- |
| indigo.50  | `#F2F6FC` |
| indigo.100 | `#E1ECF8` |
| indigo.200 | `#CADEF3` |
| indigo.300 | `#A5C9EB` |
| indigo.400 | `#7AADE0` |
| indigo.500 | `#5B90D6` |
| indigo.600 | `#4675CA` |
| indigo.700 | `#3F67C0` |
| indigo.800 | `#365297` |
| indigo.900 | `#304678` |
| indigo.950 | `#212D4A` |

#### Gray scale
| Token | Hex |
| --- | --- |
| gray.400     | `#9CA3AF` |
| gray.text    | `#E8E9EC` |
| gray.muted   | `#9CA3AF` |
| gray.bg      | `#181B25` |
| gray.surface | `#EDEEF0` |

#### Semantic aliases
| Alias | Value | Usage |
| --- | --- | --- |
| `PRIMARY`    | `#3F67C0` (indigo.700) | Primary accent |
| `BG_DARK`    | `#181B25` (gray.bg)    | Dark backgrounds (title slides) |
| `BG_SURFACE` | `#EDEEF0` (gray.surface) | Light surfaces (lower thirds) |
| `TEXT_COLOR` | `#E8E9EC` (gray.text)  | Body text on dark bg |
| `GRAY_TEXT`  | `#9CA3AF` (gray.muted) | Handles, subtitles, meta |

### Fonts

- **Primary / code:** Roboto Mono — loaded via `@remotion/google-fonts/RobotoMono`. Weights: `400`, `700`.
- **UI / supporting:** Inter — loaded via `@remotion/google-fonts/Inter`. Weights: `400`, `500`, `600`, `700`.
- **Title weight:** `800` (black) when available.
- **Design reference (Paper mocks):** Geist Mono.

### Typography / layout defaults

- `fontSize`: `40`
- `tabSize`: `3`
- `horizontalPadding`: `60`
- `verticalPadding`: `84`

### Icons

Only use https://lucide.dev/  (there is an NPM package)

If a relevant icon is not found, please consult the user.