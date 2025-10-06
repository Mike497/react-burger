const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`API error has occurred: ${response.status}`);
};

export const loadIngredients = () => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse);
};