import constructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructor
} from './constructorSlice';
import { TIngredient } from '../utils/types';

describe('constructor reducer test', () => {

  const bunIngredient: TIngredient = { _id: 'bun1', name: 'Bun', type: 'bun', price: 100, image: '', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image_mobile: '', image_large: '' };
  const fillingIngredient1: TIngredient = { _id: 'fill1', name: 'Filling 1', type: 'main', price: 50, image: '', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image_mobile: '', image_large: '' };
  const fillingIngredient2: TIngredient = { _id: 'fill2', name: 'Filling 2', type: 'sauce', price: 20, image: '', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image_mobile: '', image_large: '' };

  it('should return the initial state', () => {
    // @ts-ignore
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addIngredient (bun)', () => {
    const nextState = constructorReducer(initialState, addIngredient(bunIngredient));
    expect(nextState.bun).toEqual(bunIngredient);
    expect(nextState.fillings).toEqual([]);
  });

  it('should handle addIngredient (filling)', () => {
    const action = addIngredient(fillingIngredient1);
    const nextState = constructorReducer(initialState, action);
    expect(nextState.bun).toBeNull();
    expect(nextState.fillings.length).toBe(1);
    expect(nextState.fillings[0]).toEqual(expect.objectContaining(fillingIngredient1));
    expect(nextState.fillings[0]).toHaveProperty('uniqueId');
  });

  it('should handle removeIngredient', () => {
    const addedAction = addIngredient(fillingIngredient1);
    const stateWithFilling = constructorReducer(initialState, addedAction);
    const uniqueId = stateWithFilling.fillings[0].uniqueId;

    const nextState = constructorReducer(stateWithFilling, removeIngredient(uniqueId));
    expect(nextState.fillings).toEqual([]);
  });

  it('should handle reorderIngredients', () => {
    let state = constructorReducer(initialState, addIngredient(fillingIngredient1));
    state = constructorReducer(state, addIngredient(fillingIngredient2));
    
    expect(state.fillings[0]._id).toBe('fill1');
    expect(state.fillings[1]._id).toBe('fill2');

    const nextState = constructorReducer(state, reorderIngredients({ dragIndex: 0, hoverIndex: 1 }));
    expect(nextState.fillings[0]._id).toBe('fill2');
    expect(nextState.fillings[1]._id).toBe('fill1');
  });

  it('should handle clearConstructor', () => {
    let state = constructorReducer(initialState, addIngredient(bunIngredient));
    state = constructorReducer(state, addIngredient(fillingIngredient1));

    const nextState = constructorReducer(state, clearConstructor());
    expect(nextState).toEqual(initialState);
  });
});