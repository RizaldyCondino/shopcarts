import { BRANDS_QUERY_RESULT } from "@/sanity.types";
import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface Props {
  brands: BRANDS_QUERY_RESULT;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

const BrandList = ({
  brands,
  selectedBrand,
  setSelectedBrand,
}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">
        Brand Categories
      </Title>

      <RadioGroup
        value={selectedBrand || ""}
        onValueChange={(value) => setSelectedBrand(value)}
        className="mt-2 space-y-1"
      >
        {brands?.map((brand) => (
          <div
            key={brand?._id}
            onClick={() =>
              setSelectedBrand(
                brand?.slug?.current as string
              )
            }
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug?.current as string}
              id={brand?.slug?.current}
              className="rounded-sm"
            />

            <Label
              htmlFor={brand?.slug?.current}
              className={`${
                selectedBrand === brand?.slug?.current
                  ? "font-semibold text-shop_dark_green"
                  : "font-normal"
              }`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedBrand && (
        <button
          onClick={() => setSelectedBrand(null)}
          className="text-shop_dark_green underline text-xs mt-2 font-medium hover:text-shop_orange hoverEffect"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default BrandList;