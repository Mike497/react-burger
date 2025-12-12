import userFeedReducer, {
  userWsConnect,
  userWsDisconnect,
  userWsOpen,
  userWsClose,
  userWsError,
  userWsMessage
} from './userFeedSlice';
import { TFeedResponse } from './feedSlice';

type TUserFeedState = ReturnType<typeof userFeedReducer>;

describe('user feed reducer test', () => {
  const initialState: TUserFeedState = {
    status: 'idle',
    orders: [],
    error: undefined,
  };

  it('should return the initial state', () => {
    // @ts-ignore
    expect(userFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle userWsConnect', () => {
    const nextState = userFeedReducer(initialState, userWsConnect('ws://test.url'));
    expect(nextState.status).toBe('connecting');
  });

  it('should handle userWsDisconnect', () => {
    const state: TUserFeedState = { ...initialState, status: 'open' };
    const nextState = userFeedReducer(state, userWsDisconnect());
    expect(nextState.status).toBe('closed');
  });

  it('should handle userWsOpen', () => {
    const state: TUserFeedState = { ...initialState, status: 'connecting' };
    const nextState = userFeedReducer(state, userWsOpen());
    expect(nextState.status).toBe('open');
    expect(nextState.error).toBeUndefined();
  });

  it('should handle userWsClose', () => {
    const state: TUserFeedState = { ...initialState, status: 'open' };
    const nextState = userFeedReducer(state, userWsClose());
    expect(nextState.status).toBe('closed');
  });

  it('should handle userWsError', () => {
    const errorMessage = 'Test user feed error';
    const nextState = userFeedReducer(initialState, userWsError(errorMessage));
    expect(nextState.error).toBe(errorMessage);
  });

  it('should handle userWsMessage', () => {
    const message: TFeedResponse = {
      success: true,
      orders: [{ _id: '1', number: 123, name: 'My Test Order', status: 'done', ingredients: [], createdAt: '' }],
      total: 10,
      totalToday: 1
    };
    const nextState = userFeedReducer(initialState, userWsMessage(message));
    expect(nextState.orders).toEqual(message.orders);
  });
});