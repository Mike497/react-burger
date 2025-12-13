import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../utils/types';

type TConstructorState = {
    fillings: TConstructorIngredient[];
    bun: TIngredient | null;
}

export const initialState: TConstructorState = {
  fillings: [],
  bun: null
};

const uniqueId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient | TIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient as TIngredient;
        } else {
          state.fillings.push(ingredient as TConstructorIngredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        if (ingredient.type !== 'bun') {
            return { payload: { ...ingredient, uniqueId: uniqueId() } };
        }
        return { payload: ingredient };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
    reorderIngredients: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.fillings[dragIndex];

      state.fillings.splice(dragIndex, 1);
      state.fillings.splice(hoverIndex, 0, draggedItem);
    },
    clearConstructor: (state) => {
      state.fillings = [];
      state.bun = null;
    }
  },
});

export const { addIngredient, removeIngredient, reorderIngredients, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;