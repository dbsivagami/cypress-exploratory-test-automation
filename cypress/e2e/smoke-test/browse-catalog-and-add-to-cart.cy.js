import HomePage from "../../support/pages/HomePage";
import ProductDetailsPage from "../../support/pages/ProductDetailsPage";
import ProductListPage from "../../support/pages/ProductListPage";

describe("Browse a category and add a product to the cart" , () => {
  beforeEach(() => {
    cy.resetCart("/");
  });

  it("p0userjourney 1 - select category, select product and add to cart", () => {
    HomePage.selectCategory("Men's Outerwear");
    cy.url().should("include", "/list/mens_outerwear");

    ProductListPage.getProductCount().should("be.gt", 0); //verifying that the product list is not empty
    ProductListPage.openFirstProduct();
    cy.url().should("include", "/detail/mens_outerwear/");  //verifying the url of details page view

    ProductDetailsPage.getTitle().should("be.visible");
    ProductDetailsPage.selectSize("L").selectQuantity(2);
    ProductDetailsPage.addToCart();
    
    HomePage.getCartBadgeCount().should("eq",2)

  });
});