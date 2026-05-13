import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ products: [] });
    }

    // Search products by name, description, or other fields using proper GROQ parameters
    const products = await client.fetch(
      `*[_type == "product" && (
        name match $query || 
        description match $query ||
        category->title match $query ||
        brand->title match $query
      )] | order(name asc) [0...10] {
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
      { query: `${query}*` }
    );

    return NextResponse.json({
      products: products || [],
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
