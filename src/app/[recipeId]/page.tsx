"use client";

import {
  useDeleteRecipeMutation,
  useGetRecipeQuery,
} from "@/redux/services/recipeApi";
import { Button } from "@/shared/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PageProps = {
  params: {
    recipeId: string;
  };
};

export default function Recipe({ params }: PageProps) {
  const { recipeId } = params;
  const recipeQuery = useGetRecipeQuery(recipeId);
  const router = useRouter();
  const [deleteRecipeMutation] = useDeleteRecipeMutation();

  async function handleDelete() {
    await deleteRecipeMutation(recipeId);
    router.push("/");
  }

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 mt-4">
      <div className="relative w-full h-96">
        <Image
          fill={true}
          src={recipeQuery.data?.image || ""}
          alt={recipeQuery.data?.name || ""}
          className="rounded object-cover"
        />
      </div>
      <div className="col-span-1 flex gap-2 flex-col">
        <h2 className="text-5xl font-bold">{recipeQuery.data?.name}</h2>
        <div className="">{recipeQuery.data?.description}</div>
        <div>
          <div>
            <p className="font-bold text-2xl my-4">Ingredients:</p>

            <div className="flex gap-3 flex-wrap">
              {recipeQuery.data?.ingredients?.map((ingredient, idx) => (
                <div className="bg-slate-200 px-3 py-1 rounded-full" key={idx}>
                  {ingredient.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-2xl mt-4">
              Cooking time:{" "}
              <span className="font-normal">
                {recipeQuery.data?.cookingTime?.time}
                {recipeQuery.data?.cookingTime?.unit}
              </span>
            </p>
          </div>
        </div>
        <div className="h-full flex justify-end items-end gap-2">
          <Link href={`/${recipeId}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
