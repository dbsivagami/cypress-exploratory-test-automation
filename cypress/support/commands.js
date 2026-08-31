
/**
 * cy.resetCart(path)
 * Visits `path` with the cart cleared before the app loads, so every
 * test starts with an empty cart instead of inheriting leftover state.
 */

import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";

Cypress.Commands.add("resetCart", (path = "/") => {
  cy.visit(path, {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });
});

/**
 * cy.addToCart(category, productName, { size, qty })
 * This is selected for custom cypress command as it requires reusable
 * navigation and action pre-requisite across 2 page flow:
 * (category list -> product detail -> add to cart) before performing 
 * tests in cart or checkout screens
 */

Cypress.Commands.add("addToCart", (category, productName, options = {}) => {
  const { size, qty } = options;
  ProductListPage.visit(category);
  ProductListPage.openProduct(productName);

  if (size) {
    ProductDetailsPage.selectSize(size);
  }
  if (qty) {
    ProductDetailsPage.selectQuantity(qty);
  }
  ProductDetailsPage.addToCart();
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })