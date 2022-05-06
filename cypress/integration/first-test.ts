import { describe } from "mocha";

describe("first test", () => {
  it("should go to homepage", () => {
    cy.visit("http://loaclhost:3000").title().should("eq", "Login");
  });
});
