"use client";

import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, TextArea } from "@/shared/ui";
import { useEffect } from "react";
import Dropzone from "@/shared/ui/Dropzone/Dropzone";
import Image from "next/image";
import { OptionType } from "@/shared/types/optionType";
import {
  useGetRecipeQuery,
  useUpdateRecipeMutation,
} from "@/redux/services/recipeApi";
import RecipeType from "@/shared/types/recipeType";
import { CookingTimeUnitType } from "@/shared/types/cookingTimeType";
import { useRouter } from "next/navigation";
import { useUploadImage } from "@/hooks/useUploadImage";
import { Button } from "@/shared/ui/Button";
import Link from "next/link";

type PageProps = {
  params: {
    recipeId: string;
  };
};

type FormValues = {
  name: string;
  image: string;
  description: string;
  ingredients: { name: string }[];
  time: number;
  unit: CookingTimeUnitType;
};

const options: OptionType[] = [
  { label: "Minutes", value: "m" },
  { label: "Hours", value: "h" },
];

const recipeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.string(),
  description: yup.string().required("Description is required"),
  ingredients: yup.array().of(yup.object().shape({ name: yup.string() })),
  time: yup.string().required("Time is required"),
  unit: yup.string().required("Time unit is required"),
});

export default function Edit({ params }: PageProps) {
  const {
    imageUrl,
    isImageLoading,
    onSuccess,
    onError,
    onUploadStart,
    removeImage,
  } = useUploadImage();
  const { recipeId } = params;
  const recipeQuery = useGetRecipeQuery(recipeId);
  const [updateRecipeMutation, result] = useUpdateRecipeMutation();
  const form = useForm<FormValues>({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ name: "" }],
      time: 0,
      unit: "m",
    },
  });
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const router = useRouter();

  useEffect(() => {
    if (recipeQuery.data) {
      const ingredients = recipeQuery.data?.ingredients;
      form.reset({
        ...form.getValues(),
        name: recipeQuery.data?.name,
        description: recipeQuery.data?.description,
        image: recipeQuery.data?.image,
        ingredients: ingredients.length ? ingredients : [{ name: "" }],
        time: recipeQuery.data?.cookingTime?.time,
        unit: recipeQuery.data?.cookingTime?.unit,
      });
    }
  }, [form, recipeQuery.data]);

  async function onSubmit(data: FormValues) {
    if (imageUrl !== "") {
      data.image = imageUrl;
    }

    const recipe: RecipeType = {
      _id: recipeId,
      cookingTime: {
        time: data.time,
        unit: data.unit,
      },
      image: data.image,
      description: data.description,
      ingredients: data.ingredients,
      name: data.name,
    };

    await updateRecipeMutation(recipe);
    router.push(`/${recipeId}`);
  }

  return (
    <form
      className="grid grid-cols-2 gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Dropzone
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        onError={onError}
      />

      <div className="relative w-full h-full">
        {imageUrl && (
          <Button
            className="z-10 absolute right-0"
            color="danger"
            onClick={removeImage}
            type="button"
          >
            Remove
          </Button>
        )}
        {isImageLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <Image
            src={
              imageUrl
                ? imageUrl
                : form.getValues().image
                ? form.getValues().image
                : "https://ebf-indh.ma/wp-content/plugins/tutor/assets/images/placeholder.svg"
            }
            fill={true}
            alt={recipeQuery.data?.name || ""}
            className="rounded object-cover"
          />
        )}
      </div>
      <div>
        <div>
          <Input
            label="Name"
            errorMessage={form.formState.errors.name?.message}
            {...form.register("name")}
          />
        </div>
        <div>
          <TextArea
            label="Description"
            errorMessage={form.formState.errors.description?.message}
            {...form.register("description")}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Cooking Time"
            type="number"
            errorMessage={form.formState.errors.time?.message}
            {...form.register("time")}
          />
          <Select
            options={options}
            label="Unit"
            errorMessage={form.formState.errors.unit?.message}
            {...form.register("unit")}
          />
        </div>
        <p>Ingredients</p>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                placeholder="Enter ingredient"
                label=""
                {...form.register(`ingredients.${index}.name` as const, {
                  required: true,
                })}
                errorMessage={
                  form.formState.errors.ingredients?.[index]?.name?.message
                }
              />
              <Button color="danger" onClick={() => remove(index)}>
                Delete
              </Button>
            </div>
          );
        })}
        <div className="mb-4">
          <Button type="button" onClick={() => append({ name: "" })}>
            Add
          </Button>
        </div>
        <div>
          <Link href={`/${recipeId}`}>
            <Button color="gray" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="rounded ml-2">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
