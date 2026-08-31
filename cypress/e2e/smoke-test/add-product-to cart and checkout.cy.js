import CartPage from "../../support/pages/CartPage";
import CheckoutPage from "../../support/pages/CheckoutPage";

describe("Checkout with dummy credit card", () => {
  beforeEach(() => {
    cy.resetCart("/");
    cy.addToCart("mens_outerwear", "Men's Tech Shell Full-Zip", {size: "M",qty: 1,});
    CartPage.visit();
    CartPage.getSubtotal().invoke("text").should("match", /\$\d/).as("cartSubtotal");
    CartPage.goToCheckout();
    cy.url().should("include", "/checkout"); //verifying the url or checkoutPage
  });

  it("p0userjourney 2 - user able to checkout with a dummy card", function(){
    CheckoutPage.getOrderTotal().should("contain.text", this.cartSubtotal);
    cy.fixture("customer_details").then((customer) => {
      CheckoutPage.fillForm(customer);
    });

      CheckoutPage.placeOrder();

      cy.url().should("include", "/checkout/success");
      CheckoutPage.getConfirmationHeading().should("be.visible");
    
  });
});
