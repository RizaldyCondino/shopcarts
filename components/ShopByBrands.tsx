import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={40} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={40} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset size={40} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={40} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();

  return (
    <div className="mb-10 lg:mb-20 bg-shop-lighter_bg lg:p-7 p-4 rounded-md">
      {/* header */}
      <div className="flex justify-between items-center gap-5 mb-6">
        <Title>Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          View All
        </Link>
      </div>

      {/* brands grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            href={{
              pathname: "/shop",
              query: { brand: brand?.slug?.current },
            }}
            className="bg-white rounded-md flex items-center justify-center p-3 aspect-[4/3] hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt="brandImage"
                width={120}
                height={80}
                className="w-full h-full object-contain"
              />
            )}
          </Link>
        ))}
      </div>

      {/* extra features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 p-4 rounded-md shadow-sm shadow-shop_light_green/20">
        {extraData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-lightColor hover:text-shop_light_green transition"
          >
            <span className="shrink-0">{item.icon}</span>

            <div className="text-sm leading-tight">
              <p className="font-bold text-darkColor/80">
                {item.title}
              </p>
              <p className="text-lightColor text-xs sm:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;