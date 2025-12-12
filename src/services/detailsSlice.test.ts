import detailsReducer, { initialState, selectIngredient, clearIngredient } from './detailsSlice';
import { TIngredient } from '../utils/types';

describe('details reducer test', () => {

  const mockIngredient: TIngredient = {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    price: 123,
    image: '', proteins: 10, fat: 10, carbohydrates: 10, calories: 100, image_mobile: '', image_large: ''
  };

  it('should return the initial state', () => {
    // @ts-ignore
    expect(detailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle selectIngredient', () => {
    const nextState = detailsReducer(initialState, selectIngredient(mockIngredient));
    expect(nextState.selectedIngredient).toEqual(mockIngredient);
  });

  it('should handle clearIngredient', () => {
    const stateWithIngredient = { selectedIngredient: mockIngredient };
    const nextState = detailsReducer(stateWithIngredient, clearIngredient());
    expect(nextState.selectedIngredient).toBeNull();
  });
});