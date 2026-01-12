# CSS UNCUT

> The entire CSS language. Uncut.

A comprehensive CSS utility library featuring single-purpose classes namespaced across multiple breakpoints. An experimental project exploring how much of CSS can reasonably fit into a single file.

## Build Statistics

```
📦 Raw file size:           163.04 KB
📦 Minified file size:      114.35 KB
📦 Minified + Gzipped:       20.18 KB

💾 Minification savings:    29.9%
💾 Gzip savings:            87.6%
```

## Installation

```bash
npm install css-uncut
```

Or use the CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/css-uncut/css/uncut.min.css">
```

## Usage

```html
<div class="df flex-wrap gap-3 pa4 bg-near-white br3">
  <div class="w-100 w-50-s w-33-l pa3 bg-blue white br2">
    Responsive column
  </div>
</div>
```

## Breakpoints

Mobile-first responsive design with four breakpoints:

| Suffix | Breakpoint | Description |
|--------|------------|-------------|
| (none) | All | Base styles |
| `-s`   | ≥ 30em (480px) | Small screens and up |
| `-m`   | ≥ 48em (768px) | Medium screens and up |
| `-l`   | ≥ 60em (960px) | Large screens and up |
| `-xl`  | ≥ 90em (1440px) | Extra large screens and up |

## CSS Properties Covered

This library includes **100+ CSS property partials** covering:

### Layout
- Display (flex, grid, block, inline, table, etc.)
- Position (static, relative, absolute, fixed, sticky)
- Float & Clear
- Overflow
- Visibility
- Z-Index

### Box Model
- Spacing (margin, padding) with 8-step scale
- Widths (fixed, percentage, viewport, intrinsic)
- Heights (fixed, percentage, viewport, intrinsic)
- Min/Max Width & Height
- Box Sizing
- Aspect Ratio

### Flexbox
- Direction, Wrap
- Justify Content, Align Items, Align Content, Align Self
- Flex Grow, Shrink, Basis
- Order
- Gap

### Grid
- Template Columns & Rows
- Column & Row Span
- Auto Flow
- Place Items, Place Content, Place Self

### Typography
- Font Family, Size, Weight, Style, Variant
- Line Height
- Letter Spacing
- Text Align, Transform, Decoration
- White Space, Word Break
- Text Overflow

### Colors & Backgrounds
- Text Colors
- Background Colors
- Background Size, Position, Repeat, Attachment
- Background Clip, Origin
- Background Blend Mode

### Borders
- Border Width, Style, Color, Radius
- Outline

### Effects
- Opacity
- Box Shadow
- Filters (blur, brightness, contrast, grayscale, etc.)
- Backdrop Filter
- Mix Blend Mode
- Isolation

### Transforms
- Scale, Rotate, Translate
- Transform Origin
- Perspective
- Backface Visibility

### Transitions & Animations
- Transition Property, Duration, Timing, Delay
- Animation Duration, Timing, Delay, Direction
- Animation Iteration Count, Fill Mode, Play State
- Will Change

### Interactivity
- Cursor
- Pointer Events
- User Select
- Touch Action
- Resize
- Scroll Behavior, Snap
- Overscroll Behavior

### Modern CSS
- Container Queries
- Aspect Ratio
- Logical Properties
- Content Visibility
- Contain
- Scrollbar Styling
- Accent Color
- Caret Color

## Building from Source

```bash
# Clone the repository
git clone https://github.com/mrmrs/css-uncut.git
cd css-uncut

# Build
npm run build

# Watch for changes
npm run watch
```

## Project Structure

```
css-uncut/
├── src/
│   ├── uncut.css      # Main entry file with @import statements
│   └── css/           # Source partials (100+ files)
├── css/
│   ├── uncut.css      # Compiled CSS (output)
│   └── uncut.min.css  # Minified CSS (output)
├── build.js           # Build pipeline
└── package.json
```

The build process reads `src/uncut.css`, processes all `@import` statements, handles `@custom-media` queries, and outputs the compiled files to the `css/` directory.

## Custom Media Queries

The library uses custom media queries internally:

```css
@custom-media --small (min-width: 30em);
@custom-media --medium (min-width: 48em);
@custom-media --large (min-width: 60em);
@custom-media --extra-large (min-width: 90em);
```

## Philosophy

CSS UNCUT embraces the atomic/functional CSS methodology:

- **Single Purpose**: Each class does one thing
- **Responsive**: Every utility available at every breakpoint
- **Composable**: Build any design by combining classes
- **Predictable**: Class names map directly to CSS properties
- **Small**: ~20KB gzipped despite comprehensive coverage

## License

MIT © [mrmrs](https://github.com/mrmrs)
