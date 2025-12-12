describe('Burger constructor test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');
    cy.login();
    cy.visit('/');
  });

  it('App should allow to add ingredients and place the order', () => {
    // add ingredients
    cy.dragIngredient('Краторная булка N-200i');
    cy.get('[class^=burger-constructor_constructorPanel__]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.dragIngredient('Соус Spicy-X');
    cy.get('[class^=burger-constructor_constructorPanel__]')
      .contains('Соус Spicy-X')
      .should('exist');
    cy.dragIngredient('Филе Люминесцентного тетраодонтимформа');
    cy.get('[class^=burger-constructor_constructorPanel__]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    // ingredients were added
    cy.get('[class^=burger-constructor_constructorPanel__]').contains('Краторная булка N-200i (верх)').should('exist');
    cy.get('[class^=burger-constructor_constructorPanel__]').contains('Краторная булка N-200i (низ)').should('exist');
    cy.get('[class^=burger-constructor_constructorPanel__]').contains('Филе Люминесцентного тетраодонтимформа').should('exist');
    cy.get('[class^=burger-constructor_constructorPanel__]').contains('Соус Spicy-X').should('exist');
    cy.wait(500);

    // post order
    cy.get('button').contains('Оформить заказ')
      .should('be.visible')
      .should('not.be.disabled');
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');
    cy.get('[class^=modals_modal__]').should('be.visible');
    cy.get('[class^=modals_modal__]').contains('12345').should('exist');

    // close the order modal
    cy.get('[class*=closeButton]').click({ force: true });
    cy.get('[class^=modal_modal__]').should('not.exist');

    // constructor was cleared
    cy.get('[class^=burger-constructor_constructorPanel__]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
  });
});