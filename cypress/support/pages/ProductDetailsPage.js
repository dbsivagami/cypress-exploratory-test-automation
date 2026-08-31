class ProductDetailsPage {
  getTitle() {
    return cy
      .get("shop-detail", { includeShadowDom: true })
      .find("h1", { includeShadowDom: true });
  }

  /**
   * This method accepts a string parameter size.
   * Valid values of size are: XS, S, M, L, XL
   */
  selectSize(size) {
    cy.get("#sizeSelect", { includeShadowDom: true }).select(size, {force: true,});
    return this;
  }

  /**
   * This method accepts a number parameter qty.
   * Valid values of size are: 1, 2, 3, 4, 5
   */
  selectQuantity(qty) {
    cy.get("#quantitySelect", { includeShadowDom: true }).select(String(qty), {force: true,});
    return this;
  }

  addToCart() {
    cy.get('button[aria-label="Add this item to cart"]', { includeShadowDom: true }).click();
    return this;
  }

}

export default new ProductDetailsPage();
