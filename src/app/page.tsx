"use client";

import { useGetRecipesQuery } from "@/redux/services/recipeApi";
import { Card } from "@/shared/ui";

export default function Home() {
  const recipesQuery = useGetRecipesQuery(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {recipesQuery.isLoading && <div>Loading...</div>}
      {recipesQuery.data?.map((recipe) => (
        <div key={recipe._id}>
          <Card id={recipe._id} name={recipe.name} image={recipe.image} />
        </div>
      ))}
    </div>
  );
}
