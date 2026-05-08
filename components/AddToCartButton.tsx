"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/sanity.types";
import { cn } from "@/lib/utils";

interface Props {
  product: Product | null | undefined ;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const isOutofStock = product?.stock === 0;
 
  const [isClient, setIsClient] = useState(false);

 useEffect(()=>{
  setIsClient(true);
 }, []);
 if (!isClient){
  return null;
 }
 
 
  const handleAddToCart =()=>{
    window.alert("added to cart");
  }
  return (
    <div>
      <Button
      onClick={handleAddToCart}
      disabled={isOutofStock}
        className={cn(
          "w-full bg-shop_dark_green/80 text-shop-lighter_bg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide hover:text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
        )}
      >
        <ShoppingBag /> {isOutofStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
