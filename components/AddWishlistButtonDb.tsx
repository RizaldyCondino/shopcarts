"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useStore from "@/store";

const AddWishlistButton = ({
  product,
  className,
  initialIsFavorite = false,
  onRemove,
}: {
  product: Product;
  className?: string;
  initialIsFavorite?: boolean;
  onRemove?: () => void;
}) => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { incrementFavoriteCount, decrementFavoriteCount } = useStore();

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !product?._id) return;

    const fetchFavoriteState = async () => {
      try {
        const response = await fetch("/api/favorites/list");
        if (!response.ok) return;

        const data = await response.json();
        setIsFavorite(data.favorites?.includes(product?._id));
      } catch (error) {
        console.error("Unable to fetch favorite state", error);
      }
    };

    fetchFavoriteState();
  }, [isSignedIn, product?._id]);

  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 🚫 BLOCK GUEST USERS
    if (!isSignedIn) {
      toast.error("Please login to use wishlist");
      router.push("/sign-in");
      return;
    }

    // 🚀 optimistic update (instant UI feedback)
    const prevState = isFavorite;
    setIsFavorite(!prevState);
    setLoading(true);

    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sanityId: product._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      // sync with backend response (source of truth)
      setIsFavorite(data.favorited);

      // Update Zustand count
      if (data.favorited) {
        incrementFavoriteCount();
      } else {
        decrementFavoriteCount();
      }
      onRemove?.();

      toast.success(
        data.favorited
          ? "Added to wishlist"
          : "Removed from wishlist"
      );
    } catch (error) {
      // rollback if failed
      setIsFavorite(prevState);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🚫 hide for guests (your requirement)
  if (!isSignedIn) return null;

  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button
        disabled={loading}
        onClick={handleFavorite}
        className={cn(
          "p-2.5 rounded-full transition-all duration-200 hoverEffect",
          isFavorite
            ? "bg-shop_dark_green text-white"
            : "bg-shop_light_bg hover:bg-shop_btn_dark_green hover:text-white",
          loading && "opacity-50 cursor-not-allowed"
        )}
      >
        <Heart
          size={15}
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
};

export default AddWishlistButton;