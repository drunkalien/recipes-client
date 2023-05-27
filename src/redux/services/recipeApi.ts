import RecipeType from "@/shared/types/recipeType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://recipes-server-wl5o.onrender.com/",
  }),
  tagTypes: ["Recipe", "Recipes"],
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipeType[], null>({
      query: () => "/recipes",
      providesTags: ["Recipes"],
    }),
    addRecipe: builder.mutation<RecipeType, Omit<RecipeType, "_id">>({
      query: (recipe) => ({
        url: "/recipes",
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: ["Recipes"],
    }),
    getRecipe: builder.query<RecipeType, string>({
      query: (id) => `/recipes/${id}`,
      providesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation<object, string>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipes"],
    }),
    updateRecipe: builder.mutation<RecipeType, RecipeType>({
      query: (recipe) => ({
        url: `recipes/${recipe._id}`,
        method: "PATCH",
        body: recipe,
      }),
      invalidatesTags: ["Recipe", "Recipes"],
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useDeleteRecipeMutation,
  useGetRecipeQuery,
  useGetRecipesQuery,
  useUpdateRecipeMutation,
} = recipeApi;
