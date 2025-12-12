import authReducer, {
  authRequest,
  authSuccess,
  authFailed,
  clearUser,
  setAuthChecked
} from './authSlice';
import { TUser } from '../utils/types';

describe('auth reducer test', () => {
  const initialState = {
    user: null,
    isLoading: false,
    hasError: false,
    isAuthChecked: false
  };

  const mockUser: TUser = {
    name: 'Test User',
    email: 'test@example.com'
  };

  it('should return the initial state', () => {
    // @ts-ignore
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle authRequest', () => {
    const nextState = authReducer(initialState, authRequest());
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
  });

  it('should handle authSuccess', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const nextState = authReducer(stateWithLoading, authSuccess(mockUser));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('should handle authFailed', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const nextState = authReducer(stateWithLoading, authFailed());
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.user).toBeNull();
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('should handle clearUser', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const nextState = authReducer(stateWithUser, clearUser());
    expect(nextState.user).toBeNull();
  });

  it('should handle setAuthChecked', () => {
    const nextState = authReducer(initialState, setAuthChecked(true));
    expect(nextState.isAuthChecked).toBe(true);
  });
});