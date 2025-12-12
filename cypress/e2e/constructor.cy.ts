const SELECTORS = {
  constructor: {
    panel: '[class^=burger-constructor_constructorPanel__]',
    orderButton: 'button:contains("Оформить заказ")',
  },
  modal: {
    container: '[class^=modals_modal__]',
    closeButton: '[class*=closeButton]',
  },
  ingredient: {
    card: (name: string) => `[data-ingredient-name="${name}"]`,
  },
  dropArea: '[data-testid=constructor-drop-area]'
} as const;

const INGREDIENTS = {
  bun: 'Краторная булка N-200i',
  sauce: 'Соус Spicy-X',
  main: 'Филе Люминесцентного тетраодонтимформа',
} as const;

describe('Burger constructor test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');
    cy.login();
    cy.visit('/');
  });

  it('App should allow to add ingredients and place the order', () => {
    cy.dragIngredient(INGREDIENTS.bun);
    cy.get(SELECTORS.constructor.panel)
      .contains(`${INGREDIENTS.bun} (верх)`)
      .should('exist');
    cy.dragIngredient(INGREDIENTS.sauce);
    cy.get(SELECTORS.constructor.panel)
      .contains(INGREDIENTS.sauce)
      .should('exist');
    cy.dragIngredient(INGREDIENTS.main);
    cy.get(SELECTORS.constructor.panel)
      .contains(INGREDIENTS.main)
      .should('exist');

    cy.get(SELECTORS.constructor.panel).contains(`${INGREDIENTS.bun} (верх)`).should('exist');
    cy.get(SELECTORS.constructor.panel).contains(`${INGREDIENTS.bun} (низ)`).should('exist');
    cy.get(SELECTORS.constructor.panel).contains(INGREDIENTS.main).should('exist');
    cy.get(SELECTORS.constructor.panel).contains(INGREDIENTS.sauce).should('exist');

    cy.wait(500);
    cy.get(SELECTORS.constructor.orderButton)
      .should('be.visible')
      .should('not.be.disabled')
      .click();
    cy.wait('@postOrder');

    cy.get(SELECTORS.modal.container).should('be.visible');
    cy.get(SELECTORS.modal.container).contains('12345').should('exist');

    cy.get(SELECTORS.modal.closeButton).click({ force: true });
    cy.get(SELECTORS.modal.container).should('not.exist');

    cy.get(SELECTORS.constructor.panel)
      .contains(INGREDIENTS.bun)
      .should('not.exist');
  });
});