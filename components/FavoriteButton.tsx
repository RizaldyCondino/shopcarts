"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();

  const [existingProduct, setExistingProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    if (!product) return;

    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );

    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (!product) return;

    await addToFavorite(product);

    toast.success(
      existingProduct
        ? "Product removed successfully!"
        : "Product added successfully!"
    );
  };

  // Wishlist icon in navbar/header
  if (!showProduct) {
    return (
      <Link href="/wishlist" className="group relative">
        <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />

        <span
          className="absolute -top-1 -right-1 bg-shop_dark_green text-white text-xs
          font-semibold rounded-full flex justify-center items-center h-3.5 w-3.5"
        >
          {favoriteProduct?.length || 0}
        </span>
      </Link>
    );
  }

  // Product card favorite button
  return (
    <button
      type="button"
      onClick={handleFavorite}
      className="group relative hover:text-shop_light_green hoverEffect
      border border-shop_light_green/80 hover:border-shop_light_green
      p-1.5 rounded-sm"
    >
      <Heart
        fill={existingProduct ? "#3b9c3c" : "none"}
        className={`mt-0.5 w-5 h-5 hoverEffect
        ${
          existingProduct
            ? "text-shop_light_green"
            : "text-shop_light_green/80 group-hover:text-shop_light_green"
        }`}
      />
    </button>
  );
};

export default FavoriteButton;