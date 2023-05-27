import { CookingTimeType } from "./cookingTimeType";

type RecipeType = {
  _id: string;
  name: string;
  ingredients: { name: string }[];
  description: string;
  image: string;
  cookingTime: CookingTimeType;
};

export default RecipeType;
