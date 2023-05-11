import { CATEGORIES_ACTIONS_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.util";

export const setCategories = (categories) => createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES, categories);