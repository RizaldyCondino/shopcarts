import { Category } from "@/sanity.types";
import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">
        Product Categories
      </Title>

      <RadioGroup
        value={selectedCategory || ""}
        className="mt-2 space-y-1"
      >
        {categories?.map((category) => (
          <div
            key={category?._id}
            onClick={() =>
              setSelectedCategory(
                category?.slug?.current as string
              )
            }
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={category?.slug?.current as string}
              id={category?.slug?.current}
              className="rounded-sm"
            />

            <Label
              htmlFor={category?.slug?.current}
              className={`${
                selectedCategory === category?.slug?.current
                  ? "font-semibold text-shop_dark_green"
                  : "font-normal"
              }`}
            >
              {category?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-shop_dark_green underline text-xs mt-2 font-medium hover:text-shop_orange hoverEffect"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default CategoryList;