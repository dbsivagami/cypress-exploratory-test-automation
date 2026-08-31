class CheckoutPage {
  fillForm(customer) {
    cy.get("#accountEmail", { includeShadowDom: true }).type(customer.email);
    cy.get("#accountPhone", { includeShadowDom: true }).type(customer.phone);
    cy.get("#shipAddress", { includeShadowDom: true }).type(customer.address);
    cy.get("#shipCity", { includeShadowDom: true }).type(customer.city);
    cy.get("#shipState", { includeShadowDom: true }).type(customer.state);
    cy.get("#shipZip", { includeShadowDom: true }).type(customer.zip);

    cy.get("#ccName", { includeShadowDom: true }).type(customer.card.name);
    cy.get("#ccNumber", { includeShadowDom: true }).type(customer.card.number);
    cy.get("#ccExpMonth", { includeShadowDom: true }).select(
      customer.card.expMonth,
      { force: true },
    );
    cy.get("#ccExpYear", { includeShadowDom: true }).select(
      customer.card.expYear,
      { force: true },
    );
    cy.get("#ccCVV", { includeShadowDom: true }).type(customer.card.cvv);
    return this;
  }

  placeOrder() {
    cy.get('input[type="button"][value="Place Order"]', {
      includeShadowDom: true,
    }).click();
    return this;
  }

  getConfirmationHeading() {
    return cy.contains("Thank you", { includeShadowDom: true });
  }
}

export default new CheckoutPage();
