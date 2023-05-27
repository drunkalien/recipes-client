"use client";

import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Select, TextArea } from "@/shared/ui";
import Image from "next/image";
import { OptionType } from "@/shared/types/optionType";
import { useAddRecipeMutation } from "@/redux/services/recipeApi";
import { useUploadImage } from "@/hooks/useUploadImage";
import Dropzone from "@/shared/ui/Dropzone/Dropzone";
import type RecipeType from "@/shared/types/recipeType";
import { CookingTimeUnitType } from "@/shared/types/cookingTimeType";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";

type FormValues = {
  name: string;
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
  description: yup.string().required("Description is required"),
  ingredients: yup.array().of(yup.object().shape({ name: yup.string() })),
  time: yup.string().required("Time is required"),
  unit: yup.string().required("Time unit is required"),
});

export default function Create() {
  const {
    imageUrl,
    isImageLoading,
    onSuccess,
    onError,
    onUploadStart,
    removeImage,
  } = useUploadImage();
  const [addRecipeMutation] = useAddRecipeMutation();
  const router = useRouter();

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

  async function onSubmit(data: FormValues) {
    if (imageUrl) {
      const recipe: Omit<RecipeType, "_id"> = {
        cookingTime: {
          time: data.time,
          unit: data.unit,
        },
        image: imageUrl,
        description: data.description,
        ingredients: data.ingredients,
        name: data.name,
      };

      await addRecipeMutation(recipe);
      router.push("/");
    } else {
      alert("Please upload an image");
    }
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
            key="remove-image"
            className="p-2 z-10 absolute right-0 bg-red-500"
            onClick={removeImage}
            color="danger"
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
                : "https://ebf-indh.ma/wp-content/plugins/tutor/assets/images/placeholder.svg"
            }
            fill={true}
            alt="Recipe image"
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
              <Button
                className="p-2 bg-red-500 rounded text-white"
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            </div>
          );
        })}
        <div className="mb-4">
          <Button
            type="button"
            className="p-2 bg-blue-500 rounded text-white"
            onClick={() => append({ name: "" })}
          >
            Add
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            key="save-button"
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Save
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center"></div>
    </form>
  );
}
