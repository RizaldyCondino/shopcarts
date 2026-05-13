"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import NoAccess from "@/components/NoAccess";
import ProductCard from "@/components/ProductCard";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { FileX } from "lucide-react";

const WishlistPage = () => {
  const { isSignedIn, userId } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getProductsByIds = async (ids: string[]) => {
    if (!ids || ids.length === 0) {
      return [];
    }

    try {
      const products = await client.fetch(
        `*[_type == "product" && _id in $ids] | order(name asc) {
          _id,
          _type,
          name,
          slug,
          images,
          price,
          discount,
          stock,
          status,
          description,
          category->{
            _id,
            name,
            slug
          },
          brand->{
            _id,
            title,
            slug
          }
        }`,
        { ids },
      );

      return products || [];
    } catch (error) {
      console.error("Error fetching products by ids:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!isSignedIn || !userId) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/favorites/list");
        if (!response.ok) return;

        const data = await response.json();
        const favoriteProducts = await getProductsByIds(data.favorites || []);
        setProducts(favoriteProducts);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isSignedIn, userId]);

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product._id !== productId));
  };

  if (!isSignedIn) {
    return <NoAccess />;
  }

  if (loading) {
    return (
      <Container className="py-10">
        <div className="flex items-center justify-center min-h-96">
          <p>Loading wishlist...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      {/* <div className="mb-8 flex flex-col gap-3">
        
        <p className="text-sm text-muted-foreground">
          {products.length > 0
            ? `You have ${products.length} favorite product${products.length === 1 ? "" : "s"}.`
            : "Your wishlist is empty."}
        </p>
      </div> */}

      {products.length > 0 ? (
        <div>
          <Title className="mb-4">My Wishlist</Title>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onRemove={() => handleRemoveProduct(product._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-105 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-shop_light_bg p-8 text-center">
          <FileX className="w-50 h-50" />
          <p className="text-lg font-semibold">Your wishlist is empty.</p>
          <p className="text-sm text-muted-foreground max-w-lg">
            Add products to your wishlist and come back later to view them.
          </p>
          <Button asChild>
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default WishlistPage;
