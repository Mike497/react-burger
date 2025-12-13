import orderReducer, {
  initialState,
  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,
  clearOrder
} from './orderSlice';

describe('order reducer test', () => {

  it('should return the initial state', () => {
    // @ts-ignore
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle createOrderRequest', () => {
    const nextState = orderReducer(initialState, createOrderRequest());
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
  });

  it('should handle createOrderSuccess', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const orderNumber = 12345;
    const nextState = orderReducer(stateWithLoading, createOrderSuccess(orderNumber));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.orderNumber).toBe(orderNumber);
  });

  it('should handle createOrderFailed', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const nextState = orderReducer(stateWithLoading, createOrderFailed());
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.orderNumber).toBeNull();
  });

  it('should handle clearOrder', () => {
    const stateWithOrder = { ...initialState, orderNumber: 12345 };
    const nextState = orderReducer(stateWithOrder, clearOrder());
    expect(nextState.orderNumber).toBeNull();
  });
});