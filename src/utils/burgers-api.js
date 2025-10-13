const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`API error has occurred: ${response.status}`);
};

export const postOrder = (ingredientIds) => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredientIds
    })
  })
  .then(checkResponse);
};

export const loadIngredients = () => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse);
};