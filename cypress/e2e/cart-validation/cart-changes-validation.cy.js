import CartPage from "../../support/pages/CartPage";

describe("Validate/assert changes to cart", () => {
  beforeEach(() => {
    cy.resetCart("/");
    cy.addToCart("mens_outerwear", "Men's Tech Shell Full-Zip", {size: "M",qty: 1,});
    cy.addToCart("mens_outerwear", "Anvil", { size: "M", qty: 1 });
    CartPage.visit();
  });

  it("p0userjourney 3 - recalculates the subtotal when a line item's quantity changes", ()=> {
    CartPage.getItemCount().should("contain.text", "2 items");
    CartPage.getSubtotal().should("contain.text", "$72.35"); // $50.20 + $22.15

    CartPage.updateQuantity("Men's Tech Shell Full-Zip", 3);

    CartPage.getSubtotal().should("contain.text", "$172.75"); // (3 x $50.20) + $22.15
  })

  it("p0userjourney 4 - removes an item and, once the cart is fully emptied, shows the empty-cart state", () => {
    CartPage.removeItem("Anvil");

    CartPage.getItemCount().should("contain.text", "1 item");
    CartPage.getSubtotal().should("contain.text", "$50.20");

    CartPage.removeItem("Men's Tech Shell Full-Zip");

    CartPage.isEmpty().should("be.visible");
  }); 

});
