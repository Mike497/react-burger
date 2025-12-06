export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type TConstructorIngredient = TIngredient & {
  uniqueId: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TRegisterForm = {
  name: string;
  email: string;
  password?: string;
};

export type TLoginForm = Omit<TRegisterForm, 'name'>;

export type TUpdateUserForm = Partial<TRegisterForm>;

export type TOrderStatus = 'created' | 'pending' | 'done';

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: TOrderStatus;
  name: string;
  createdAt: string;
  number: number;
};