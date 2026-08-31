class CartPage {
    visit() {
    cy.visit("/cart");
    return this;
  }

  goToCheckout() {
    cy.get(".checkout-box a", { includeShadowDom: true }).click();
    return this;
  }

  getItemCount() {
    return cy.get("shop-cart", { includeShadowDom: true }).find("header span", { includeShadowDom: true });
  }

  getSubtotal() {
    return cy.get(".subtotal", { includeShadowDom: true });
  }

  cartItemRow(productName) {
    return cy.get("shop-cart-item", { includeShadowDom: true }).then(($items) => {
      const match = $items.filter(
        (_, el) => el.shadowRoot && el.shadowRoot.textContent.includes(productName)
      );
      cy.wrap(match[0]);
    });
  }

  updateQuantity(productName, qty) {
    this.cartItemRow(productName)
      .find("#quantitySelect", { includeShadowDom: true })
      .select(String(qty), { force: true });
    return this;
  }

  removeItem(productName) {
    this.cartItemRow(productName).find(".delete-button", { includeShadowDom: true }).click();
    return this;
  }

  isEmpty() {
    return cy.contains("is empty", { includeShadowDom: true });
  }

}

export default new CartPage();
