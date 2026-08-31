import { CATEGORY_SLUGS } from "./HomePage";

class ProductListPage {

  visit(categoryName) {
    const slug = CATEGORY_SLUGS[categoryName] || categoryName;
    if (!Object.values(CATEGORY_SLUGS).includes(slug)) {
      throw new Error(`Unknown category "${categoryName}".`);
    }
    cy.visit(`/list/${slug}`);
    return this;
  }

  productCards() {
    return cy.get('a[href*="/detail/"]', { includeShadowDom: true });
  }

  getProductCount() {
    return this.productCards().its("length");
  }

  openFirstProduct() {
    this.productCards().first().click();
    return this;
  }

  openProduct(productName) {
    // NOTE: intentionally the 2-arg cy.contains(text, opts) form, not the
    // 3-arg cy.contains(selector, text, opts) form — the latter does not
    // reliably pierce shadow DOM in this Cypress version. The 2-arg form
    // resolves to the deepest matching element, which is fine here since a
    // click bubbles up to the wrapping <a href="/detail/..."> regardless.
    cy.contains(productName, { includeShadowDom: true }).click();
    return this;
  }
}

export default new ProductListPage();
