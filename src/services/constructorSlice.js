import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fillings: [],
  bun: null
};

const uniqueId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.fillings.push(ingredient);
        }
      },
      prepare: (ingredient) => {
        if (ingredient.type !== 'bun') {
            return { payload: { ...ingredient, uniqueId: uniqueId() } };
        }
        return { payload: ingredient };
      }
    },
    removeIngredient: (state, action) => {
      state.fillings = state.fillings.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
    reorderIngredients: (state, action) => {
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