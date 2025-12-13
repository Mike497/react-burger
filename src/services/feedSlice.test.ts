import feedReducer, {
  initialState,
  wsConnect,
  wsDisconnect,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from './feedSlice';
import { TOrder } from '../utils/types';

type TFeedState = ReturnType<typeof feedReducer>;

type TMockFeedResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};


describe('feed reducer test', () => {

  it('should return the initial state', () => {
    // @ts-ignore
    expect(feedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle wsConnect', () => {
    const nextState = feedReducer(initialState, wsConnect('ws://test.url'));
    expect(nextState.status).toBe('connecting');
  });

  it('should handle wsDisconnect', () => {
    const state: TFeedState = { ...initialState, status: 'open' };
    const nextState = feedReducer(state, wsDisconnect());
    expect(nextState.status).toBe('closed');
  });

  it('should handle wsOpen', () => {
    const state: TFeedState = { ...initialState, status: 'connecting' };
    const nextState = feedReducer(state, wsOpen());
    expect(nextState.status).toBe('open');
    expect(nextState.error).toBeUndefined();
  });

  it('should handle wsClose', () => {
    const state: TFeedState = { ...initialState, status: 'open' };
    const nextState = feedReducer(state, wsClose());
    expect(nextState.status).toBe('closed');
  });

  it('should handle wsError', () => {
    const errorMessage = 'Test error';
    const nextState = feedReducer(initialState, wsError(errorMessage));
    expect(nextState.error).toBe(errorMessage);
  });

  it('should handle wsMessage', () => {
    const message: TMockFeedResponse = {
      success: true,
      orders: [{ _id: '1', number: 123, name: 'Test Order', status: 'done', ingredients: [], createdAt: '' }],
      total: 100,
      totalToday: 10
    };
    const nextState = feedReducer(initialState, wsMessage(message));
    expect(nextState.orders).toEqual(message.orders);
    expect(nextState.total).toBe(message.total);
    expect(nextState.totalToday).toBe(message.totalToday);
  });
});
