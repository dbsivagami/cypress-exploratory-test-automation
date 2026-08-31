class CartPage {
    visit() {
    cy.visit("/cart");
    return this;
  }

  goToCheckout() {
    cy.get(".checkout-box a", { includeShadowDom: true }).click();
    return this;
  }

}

export default new CartPage();
