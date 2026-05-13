"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

const WishListProduct = ({
  favoriteProducts,
}: {
  favoriteProducts: Product[];
}) => {
  const [products, setProducts] = useState(favoriteProducts);

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onRemove={() =>
            setProducts((prev) =>
              prev.filter((item) => item._id !== product._id)
            )
          }
        />
      ))}
    </div>
  );
};

export default WishListProduct;