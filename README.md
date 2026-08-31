# SHOP (shop.polymer-project.org) — Cypress E2E Suite

Cypress automation for the Polymer Shop demo app, covering high priority user
journeys I judged worth testing after exploring the site (see
"Prioritised journeys" below), using the Page Object Model.

## How to run it

```bash
npm install
npx cypress install   # downloads the Cypress binary if npm's postinstall was skipped
npm run cy:run         # headless, CI-style run of the whole suite (cypress run)
npm run cy:open         # interactive runner, for development
```

Also available, to run one journey at a time:

```bash
npm run cy:run:smoke      # browse -> product -> add to cart
npm run cy:run:checkout   # checkout, incl. dummy credit card
npm run cy:run:cart       # cart quantity/remove management
npm run cy:run:catalog    # stubbed network call
```

## Prioritised user journeys

I explored the site first (home → 4 categories → product detail → cart →
checkout) rather than guessing at scope. User journeys short listed based on priority order is listed below
:

1. **P0 — Browse and add to cart** (`smoke/`). If a shopper can't get from
   browsing to "an item in the cart," nothing else matters. Most
   fundamental path, most likely to be hit by every real visitor.
2. **P0 — Add to cart and checkout with a dummy credit card** (`checkout/`).
   The explicitly requested deliverable, and the step where a real business loses revenue
   if it silently breaks.


## Selector strategy

The app is built with Polymer web components — nearly everything renders
inside shadow DOM, and there are no `data-testid`/`data-cy` hooks anywhere
in the markup. Given that, selectors are chosen in this order of
preference:

1. **Stable, semantic attributes** where the app provides them —
   `aria-label` (e.g. `button[aria-label="Add this item to cart"]`,
   `paper-icon-button[aria-label*="Shopping cart"]`, which conveniently
   encodes the live item count), and native element `id`s on real
   `<input>`/`<select>` elements (`#accountEmail`, `#sizeSelect`, …), which
   are part of the app's own component contract and unlikely to change for
   styling reasons.
2. **Visible text**, via `cy.contains(text, { includeShadowDom: true })`,
   for content that's inherently text-identified (a product's title, "is
   empty").
3. **Structural CSS**, scoped from a specific ancestor, only where neither
   of the above applies (e.g. `.checkout-box a`, `.delete-button`).

`includeShadowDom: true` is set globally in `cypress.config.js`, but it does
**not** reliably propagate to every command in this Cypress version —
`.contains()` needs it passed inline regardless of the global setting, and
chaining multiple shadow-piercing `.find()`/`.contains()` calls together is
unreliable in this app. The working pattern used throughout the page
objects is: resolve one scoping element, then a single `.find()` call with
one precise selector straight to the target — never a multi-hop chain.


## Custom commands vs. Page Object methods

- **Page Object methods** (`cypress/support/pages/*.js`) handle anything
  scoped to a single page — e.g. `CheckoutPage.fillForm()`.
- **Custom commands** (`cypress/support/commands.js`) are reserved for
  cross-page flows or global setup, registered on `cy` itself so any spec
  can use them without an import:
  - `cy.resetCart(path)` — visits `path` with the cart's `localStorage`
    cleared *before* the app boots (via `onBeforeLoad`, not after — the app
    reads cart state on load, so clearing after `cy.visit()` is too late).
  - `cy.addToCart(category, productName, { size, qty })` — spans the
    category list and product detail pages; used by three of the four spec
    files, so it doesn't belong to any single page object.

# Assumptions and trade-offs

- **Some product-card lookups use `href`** (counting cards, opening the
  first one), which isn't ideal since it's tied to routing, not test
  intent — but it's the best option available there. Selecting a specific
  product by name uses visible text instead, not `href`.

## Known gaps I'd fix with more time

    - **Real app bug, currently untested:** adding a quantity of 5 to the same
  product three or more times leaves the cart's quantity field blank. The
  cart's quantity dropdown only supports values up to 12, so a running
  total past that (15, in this case) doesn't match any option.