const baseUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`API error has occurred: ${response.status}`);
};

const request = (endpoint, options) => {
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

export const postOrder = (ingredientIds) => {
  return request('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  });
};

export const loadIngredients = () => {
  return request('/ingredients');
};
