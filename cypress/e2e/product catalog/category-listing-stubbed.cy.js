import ProductListPage from "../../support/pages/ProductListPage";

describe("Verifying product list by intercepting API response", () => {

it("p1 userjourney1 - renders the products from the intercepted response", () => {
    cy.intercept("GET", "**/data/ladies_outerwear.json", {
      fixture: "ladies_outerwear_stub.json",
    }).as("getCategory");

    
    ProductListPage.visit("ladies_outerwear");
    cy.wait("@getCategory");
    
    ProductListPage.getProductCount().should("eq", 2);
    cy.contains("Stub Test Jacket", { includeShadowDom: true }).should("be.visible");
    cy.contains("Stub Test Vest", { includeShadowDom: true }).should("be.visible");
    cy.contains("$99.99", { includeShadowDom: true }).should("be.visible");
});   

});