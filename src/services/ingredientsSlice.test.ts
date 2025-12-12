import ingredientsReducer, {
  ingredientsRequest,
  ingredientsSuccess,
  ingredientsFailed
} from './ingredientsSlice';
import { TIngredient } from '../utils/types';

describe('ingredients reducer test', () => {
  const initialState = {
    isLoading: false,
    hasError: false,
    items: []
  };

  const mockIngredients: TIngredient[] = [
    { _id: '1', name: 'Ingredient 1', type: 'bun', price: 10, image: '', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image_mobile: '', image_large: '' },
    { _id: '2', name: 'Ingredient 2', type: 'main', price: 20, image: '', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image_mobile: '', image_large: '' }
  ];

  it('should return the initial state', () => {
    // @ts-ignore
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ingredientsRequest', () => {
    const nextState = ingredientsReducer(initialState, ingredientsRequest());
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
  });

  it('should handle ingredientsSuccess', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const nextState = ingredientsReducer(stateWithLoading, ingredientsSuccess(mockIngredients));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.items).toEqual(mockIngredients);
  });

  it('should handle ingredientsFailed', () => {
    const stateWithLoading = { ...initialState, isLoading: true, items: mockIngredients };
    const nextState = ingredientsReducer(stateWithLoading, ingredientsFailed());
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.items).toEqual([]);
  });
});