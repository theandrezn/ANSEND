# ANSEND responsive mobile regression report

Generated on 2026-06-18.

## Scope

Routes audited with Playwright:

- `#feed`
- `#nexo-feed`
- `#marketplace`
- `#produtores`
- `#comunidade`
- `#bate-papo`
- `#ia`
- `#biblioteca`
- `#musicas`
- `#compras`
- `#favoritos`
- `#carrinho`
- `#perfil`
- `#cadastrar`
- `#configuracoes`
- `#vendedor`
- `#beat-1`
- `#playlist-pack-trap-essentials`
- `#suporte`

Viewports audited:

- `360x800`
- `375x812`
- `390x844`
- `412x915`
- `430x932`
- `768x1024`
- `1024x1366`
- `1440x900`

Evidence:

- Before screenshots: `tests/responsive-screenshots/before`
- Fast before metrics: `tests/responsive-screenshots/before-fast/responsive-report.json`
- Final screenshots: `tests/responsive-screenshots/after`
- Final metrics: `tests/responsive-screenshots/after/responsive-report.json`

## Corrections

| Route | Viewport | Problem found | File changed | Correction applied | Final result |
| --- | --- | --- | --- | --- | --- |
| All app routes | `360x800`, `375x812`, `390x844`, `412x915`, `430x932` | Mobile sidebar remained partially visible off canvas, creating clipped interactive targets and false layout pressure. | `styles.css` | Rebuilt the mobile/tablet sidebar as a true off-canvas drawer with hidden state, overlay, full-width page content and 44px drawer targets. | No horizontal overflow or clipped sidebar targets in final Playwright pass. |
| All app routes | `768x1024`, `1024x1366` | Tablet view kept the desktop sidebar, squeezing route content and fixed bars. | `styles.css` | Converted tablet widths up to `1100px` to drawer navigation and full-width app content. | Tablet routes render without content being cut by the sidebar. |
| `#feed` | `360x800` through `1024x1366` | Hero headline and NEXO prompt used desktop widths, causing clipped text/form surfaces. | `styles.css` | Added mobile/tablet feed hero constraints, one-column layout, responsive title width, and full-width prompt shell. | Feed passes all audited viewports with `scrollWidth === viewportWidth`. |
| `#feed` | `1440x900` | Top beat showcase extended beyond the right edge. | `styles.css` | Constrained and offset the showcase only on desktop widths where the sidebar plus hero grid was tight. | Desktop feed passes final regression without overflow. |
| `#cadastrar` | `768x1024`, `1024x1366`, `1440x900` | Publication flow fixed bottom bar and release container exceeded the usable viewport. | `styles.css` | Added tablet drawer behavior, max-width constraints, scroll-safe step/action rows, and fixed bar width rules for sidebar and drawer modes. | Publication route passes all audited viewports. |
| `#chat`, `#ia`, `#configuracoes` | `360x800` through `1440x900` | Icon buttons, inputs and selects were below the 44px touch target requirement. | `styles.css` | Added explicit target sizing for chat header controls, NEXO send button, inputs, selects and settings controls. | No small target findings in final report. |
| `#produtores` | `360x800` through `1024x1366` | Professional tabs and card footer buttons were 38-42px high/wide. | `styles.css` | Enforced 44px targets for professional tabs, hire buttons and icon buttons. | Producer route passes all audited viewports. |
| `#comunidade` | `360x800` through `1440x900` | Composer/action chips and filter strip had undersized or clipped controls. | `styles.css` | Added 44px controls, scroll-safe composer/filter rows, and desktop filter strip horizontal scrolling. | Community route passes all audited viewports. |
| `#vendedor` | `768x1024`, `1024x1366` | Authenticated account dashboard columns could extend beyond tablet width. | `styles.css` | Forced account dashboard/hero/grid into a single responsive column under `1100px`. | Seller/account route passes all audited viewports. |
| `#playlist-pack-trap-essentials`, `#beat-1` | `768x1024`, `1024x1366` | Detail actions/meta regions used desktop row assumptions in tablet widths. | `styles.css` | Added tablet single-column detail layout, full-width meta/action constraints and 44px controls. | Detail routes pass all audited viewports. |

## Regression Test

Run:

```bash
npm run test:responsive
```

The test starts a local static server, mocks external app dependencies, opens every route in Chromium, audits every required viewport, verifies:

- document horizontal overflow;
- visible elements extending outside the viewport without an intentional horizontal scroller;
- touch targets below `44x44px`;
- fixed elements such as sidebar, topbar, player and NEXO assistant.

Final result: passed.
