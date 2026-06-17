# ANSEND Design System

## Typography

ANSEND uses one shared typography contract across the platform:

- UI and body text: `Inter`
- Product headings: `Montserrat`
- Home hero headline only: `Anton`

The source of truth is in `styles.css`:

```css
--font-sans
--font-body
--font-heading
--font-display
--font-hero
```

Do not add component-level `font-family` overrides unless a route has a documented product reason. Prefer the existing utility classes:

```css
.font-ui
.font-body
.font-heading
.font-display
```

The home hero must keep `ANSEND` in orange and the marketplace headline in white. Keep the phrase `O marketplace` together so the headline never breaks with a lonely `O` on its own line.
