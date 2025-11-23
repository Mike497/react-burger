import { getCookie, setCookie } from './cookies';
import { TUser, TIngredient, TRegisterForm, TLoginForm, TUpdateUserForm } from './types';

const baseUrl = "https://norma.education-services.ru/api";

type TServerResponse<T> = {
  success: boolean;
} & T;

const checkResponse = <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(err => Promise.reject(err));
};

const request = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return fetch(`${baseUrl}${endpoint}`, options).then(res => checkResponse<T>(res));
};

type TRefreshTokenResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;

export const refreshTokenRequest = (): Promise<TRefreshTokenResponse> => {
  return request<TRefreshTokenResponse>(`/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: getCookie('refreshToken') })
  });
};

const fetchWithRefresh = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, options);
    return await checkResponse<T>(res);
  } catch (err: any) {
    if (err.message === "jwt expired" && getCookie('refreshToken')) {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      const authToken = refreshData.accessToken.split('Bearer ')[1];
      setCookie("token", authToken);
      
      const headers = new Headers(options.headers);
      headers.set('authorization', refreshData.accessToken);

      const newRes = await fetch(`${baseUrl}${endpoint}`, {...options, headers});
      return await checkResponse<T>(newRes);
    } else {
      return Promise.reject(err);
    }
  }
};

type TOrderResponse = TServerResponse<{
    order: { number: number };
    name: string;
}>;

export const postOrder = (ingredientIds: string[]): Promise<TOrderResponse> => {
  return fetchWithRefresh<TOrderResponse>('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  });
};

type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

export const loadIngredients = (): Promise<TIngredientsResponse> => {
  return request<TIngredientsResponse>('/ingredients');
};

type TAuthResponse = TServerResponse<{
    user: TUser;
    accessToken: string;
    refreshToken: string;
}>;

export const registerRequest = (form: TRegisterForm): Promise<TAuthResponse> => {
  return request<TAuthResponse>(`/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
};

export const loginRequest = (form: TLoginForm): Promise<TAuthResponse> => {
  return request<TAuthResponse>(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
};

type TServerMessageResponse = TServerResponse<{ message: string }>;

export const forgotPasswordRequest = (email: string): Promise<TServerMessageResponse> => {
  return request<TServerMessageResponse>(`/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordRequest = ({ password, token }: {password: string, token: string}): Promise<TServerMessageResponse> => {
  return request<TServerMessageResponse>(`/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
};

export const logoutRequest = (refreshToken: string | undefined): Promise<TServerMessageResponse> => {
  return request<TServerMessageResponse>(`/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
};

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserRequest = (): Promise<TUserResponse> => {
    return fetchWithRefresh<TUserResponse>('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + getCookie('token')
        }
    });
};

export const updateUserRequest = (form: TUpdateUserForm): Promise<TUserResponse> => {
    return fetchWithRefresh<TUserResponse>('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify(form)
    });
};