
const CATEGORY_SLUGS = {
  "Men's Outerwear": "mens_outerwear",
  "Ladies Outerwear": "ladies_outerwear",
  "Men's T-Shirts": "mens_tshirts",
  "Ladies T-Shirts": "ladies_tshirts",
};

class HomePage {
  visit() {
    cy.visit("/");
    return this;
  }

  selectCategory(categoryName) {
    const slug = CATEGORY_SLUGS[categoryName];
    if (!slug) {
      throw new Error(
        `Unknown category "${categoryName}". Valid categories: ${Object.keys(CATEGORY_SLUGS).join(", ")}`,
      );
    }
    cy.get("shop-tabs").find(`a[href="/list/${slug}"]`, { includeShadowDom: true }).click();
    return this;
  }

  getCartBadgeCount() {
    return cy.get('paper-icon-button[aria-label*="Shopping cart"]', { includeShadowDom: true })
      .invoke("attr", "aria-label")
      .then((label) => parseInt(label.match(/\d+/)[0], 10));
  }

}

export default new HomePage();

export { CATEGORY_SLUGS };
