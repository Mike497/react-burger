Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://norma.education-services.ru/api/auth/login',
    body: {
      email: 'test29@test.com',
      password: '12121212'
    },
  }).then((response) => {
    console.log(response.body);
    expect(response.status).to.eq(200);

    const accessToken = response.body.accessToken.split('Bearer ')[1];
    const refreshToken = response.body.refreshToken;

    cy.setCookie('token', accessToken);
    cy.setCookie('refreshToken', refreshToken);
  });
});

const DROP_AREA_SELECTOR = '[data-testid=constructor-drop-area]';

Cypress.Commands.add('dragIngredient', (ingredientName: string) => {
  cy.get(`[data-ingredient-name="${ingredientName}"]`)
    .first()
    .as('dragElement');

  cy.get('@dragElement').then($drag => {
    cy.get(DROP_AREA_SELECTOR).then($drop => {
      const dragElement = $drag[0];
      const dropElement = $drop[0];

      const dataTransfer = new DataTransfer();

      const dragStartEvent = new DragEvent('dragstart', {
        dataTransfer,
        bubbles: true,
        cancelable: true
      });
      dragElement.dispatchEvent(dragStartEvent);

      const dropEvent = new DragEvent('drop', {
        dataTransfer,
        bubbles: true,
        cancelable: true
      });
      dropElement.dispatchEvent(dropEvent);

      const dragEndEvent = new DragEvent('dragend', {
        dataTransfer,
        bubbles: true,
        cancelable: true
      });
      dragElement.dispatchEvent(dragEndEvent);
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      dragIngredient(ingredientName: string): Chainable<void>;
    }
  }
}

export {};