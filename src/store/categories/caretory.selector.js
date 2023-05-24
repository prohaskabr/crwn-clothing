import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categoriesSlice) => categoriesSlice.categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
)

export const selectIsCategoriesLoading = createSelector(
    [selectCategories],
    (categoriesSlice) => {
        return categoriesSlice.isLoading;
    }
)