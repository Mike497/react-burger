import { getCookie, setCookie } from './cookies';

const baseUrl = "https://norma.education-services.ru/api";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(err => Promise.reject(err));
};

const request = (endpoint, options) => {
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

export const refreshTokenRequest = () => {
  return request(`/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: getCookie('refreshToken') })
  });
};

const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired" && getCookie('refreshToken')) {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      const authToken = refreshData.accessToken.split('Bearer ')[1];
      setCookie("token", authToken);
      options.headers.authorization = refreshData.accessToken;
      const newRes = await fetch(`${baseUrl}${endpoint}`, options);
      return await checkResponse(newRes);
    } else {
      return Promise.reject(err);
    }
  }
};

export const postOrder = (ingredientIds) => {
  return fetchWithRefresh('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  });
};

export const loadIngredients = () => {
  return request('/ingredients');
};

export const registerRequest = ({ email, password, name }) => {
  return request(`/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
};

export const loginRequest = ({ email, password }) => {
  return request(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

export const forgotPasswordRequest = (email) => {
  return request(`/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordRequest = ({ password, token }) => {
  return request(`/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
};

export const logoutRequest = (refreshToken) => {
  return request(`/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
};

export const getUserRequest = () => {
    return fetchWithRefresh('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + getCookie('token')
        }
    });
};

export const updateUserRequest = (form) => {
    return fetchWithRefresh('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify(form)
    });
};
