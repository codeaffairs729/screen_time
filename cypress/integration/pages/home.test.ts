/// <reference types="cypress" />

describe("Home Page", () => {
  before(() => {
    cy.visit("http://localhost:3000").wait(6000);
    // cy.slee
  });
  it("Check home nav item", () => {
    const homeNavItem = cy.get("nav a:contains('Home')");
    homeNavItem.then(($el) => {
      expect($el.position().top).to.be.lessThan(30);
      // cy.get($el)
    });
    homeNavItem.should("have.css", "font-size", "14px");
    homeNavItem.should("have.css", "font-weight", "600");
  });
  it("Check api nav item", () => {
    const apiNavItem = cy.get("nav a:contains('API')");
    apiNavItem.then(($el) => {
      expect($el.position().top).to.be.lessThan(30);
    });
    apiNavItem.should("have.css", "font-size", "14px");
    apiNavItem.should("have.css", "font-weight", "600");
  });
  it("Check profile dropdown", () => {
    cy.get("div[role='menu']").should('not.exist');
    cy.get("#headlessui-menu-button-1").click();
    cy.get("div[role='menu']").should('exist');
    // cy.get("div[role='menu']").then(($el) => {
    //   console.log("el", $el);
    //   if (!$el.is(":visible")) {
    //     throw new Error("The profile dropdown is not visible");
    //   }
    // });
  });
  it("Perform a search", () => {
    cy.get("#react-select-product-search-input").type("covid").type("{enter}");
  });
});

export {};
