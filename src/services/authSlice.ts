import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
} from '../utils/burgers-api';
import { TUser } from '../utils/types';
import { AppDispatch } from './store';

type TAuthState = {
    user: TUser | null;
    isLoading: boolean;
    hasError: boolean;
    isAuthChecked: boolean;
}

const initialState: TAuthState = {
  user: null,
  isLoading: false,
  hasError: false,
  isAuthChecked: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    authSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthChecked = true;
    },
    authFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.user = null;
      state.isAuthChecked = true;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
        state.isAuthChecked = action.payload;
    }
  },
});

export const { authRequest, authSuccess, authFailed, clearUser, setAuthChecked } = authSlice.actions;

type TRegisterData = { email: string; password?: string; name: string };
type TLoginData = Omit<TRegisterData, 'name'>;

export const register = (form: TRegisterData) => async (dispatch: AppDispatch) => {
  dispatch(authRequest());
  try {
    const res = await registerRequest(form);
    if (res.success) {
      const authToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', authToken);
      setCookie('refreshToken', res.refreshToken);
      dispatch(authSuccess(res.user));
    } else {
      dispatch(authFailed());
    }
    return res;
  } catch (error) {
    dispatch(authFailed());
    return Promise.reject(error);
  }
};

export const login = (form: TLoginData) => async (dispatch: AppDispatch) => {
  dispatch(authRequest());
  try {
    const res = await loginRequest(form);
    if (res.success) {
      const authToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', authToken);
      setCookie('refreshToken', res.refreshToken);
      dispatch(authSuccess(res.user));
    } else {
      dispatch(authFailed());
    }
    return res;
  } catch (error) {
    dispatch(authFailed());
    return Promise.reject(error);
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(authRequest());
  try {
    const refreshToken = getCookie('refreshToken');
    const res = await logoutRequest(refreshToken);
    deleteCookie('token');
    deleteCookie('refreshToken');
    dispatch(clearUser());
    return res;
  } catch (error) {
    dispatch(authFailed());
    return Promise.reject(error);
  }
};

export const getUser = () => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    try {
        const res = await getUserRequest();
        if (res.success) {
            dispatch(authSuccess(res.user));
        } else {
            dispatch(authFailed());
        }
        return res;
    } catch (error) {
        deleteCookie('token');
        deleteCookie('refreshToken');
        dispatch(authFailed());
        return Promise.reject(error);
    }
}

export const updateUser = (form: Partial<TRegisterData>) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    try {
        const res = await updateUserRequest(form);
        if (res.success) {
            dispatch(authSuccess(res.user));
        } else {
            dispatch(authFailed());
        }
        return res;
    } catch (error) {
        dispatch(authFailed());
        return Promise.reject(error);
    }
}

export default authSlice.reducer;