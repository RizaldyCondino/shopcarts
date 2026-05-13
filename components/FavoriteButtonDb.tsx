"use client";

import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useStore from "@/store";

const FavoriteButton = ({
  showProduct = false,
  product,
  initialIsFavorite = false,
  initialCount = 0,
  onRemove,
}: {
  showProduct?: boolean;
  product?: Product;
  initialIsFavorite?: boolean;
  initialCount?: number;
  onRemove?: () => void;
}) => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { favoriteCount, setFavoriteCount, incrementFavoriteCount, decrementFavoriteCount } = useStore();

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize count on mount
  useEffect(() => {
    if (!isInitialized && initialCount >= 0) {
      setFavoriteCount(initialCount);
      setIsInitialized(true);
    }
  }, [initialCount, isInitialized, setFavoriteCount]);

  useEffect(() => {
    if (!showProduct || !isSignedIn || !product?._id) return;

    const fetchFavoriteState = async () => {
      try {
        const response = await fetch("/api/favorites/list");
        if (!response.ok) return;

        const data = await response.json();
        setIsFavorite(data.favorites?.includes(product._id));
      } catch (error) {
        console.error("Unable to fetch favorite state", error);
      }
    };

    fetchFavoriteState();
  }, [showProduct, isSignedIn, product?._id]);

  const handleFavorite = async (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();

  if (!product) return;

  if (!isSignedIn) {
    toast.error("Please login to use wishlist");
    router.push("/sign-in");
    return;
  }

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

    if (res.status === 401) {
      toast.error("Please login to use wishlist");
      router.push("/sign-in");
      return;
    }

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const data = await res.json();

    setIsFavorite(data.favorited);

    if (data.favorited) {
      incrementFavoriteCount();
    } else {
      decrementFavoriteCount();

      // instantly remove from wishlist UI
      onRemove?.();
    }

    toast.success(
      data.favorited
        ? "Added to wishlist"
        : "Removed from wishlist"
    );
  } catch {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  // 🚀 NAVBAR MODE (NO PRODUCT)
  if (!showProduct) {
    if (!isSignedIn) return null;

    return (
      <Link href="/wishlist" className="group relative">
        <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />

        <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white text-xs font-semibold rounded-full flex justify-center items-center h-3.5 w-3.5">
          {favoriteCount}
        </span>
      </Link>
    );
  }

  // ❤️ PRODUCT CARD BUTTON
  if (!isSignedIn) return null;

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleFavorite}
      className={cn(
        "group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm"
      )}
    >
      <Heart
        fill={isFavorite ? "#3b9c3c" : "none"}
        className={cn(
          "mt-0.5 w-5 h-5 hoverEffect",
          isFavorite
            ? "text-shop_light_green"
            : "text-shop_light_green/80 group-hover:text-shop_light_green"
        )}
      />
    </button>
  );
};


export default FavoriteButton;