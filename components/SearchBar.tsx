"use client";

import { Search, Loader2 } from "lucide-react";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // SEARCH
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setResults(data.products || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // TOGGLE SEARCH
  const toggleSearch = () => {
    setIsExpanded((prev) => {
      const next = !prev;

      if (!next) {
        setSearchQuery("");
        setResults([]);
        setIsOpen(false);
      }

      return next;
    });
  };

  // OUTSIDE CLICK FIX (FULL RESET)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
        setResults([]);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md ">
      <div
        className="relative flex items-center justify-end w-full"
        ref={searchRef}
      >
        {/* TOGGLE BUTTON */}
        {!isExpanded && (
          <button
            onClick={toggleSearch}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        )}

        {/* EXPANDING INPUT */}
        <div
          className={`relative transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "w-full max-w-md" : "w-0"
          }`}
        >
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />

            <input
              autoFocus={isExpanded}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-shop_dark_green focus:ring-1 focus:ring-shop_dark_green"
            />

            {isLoading && (
              <Loader2 className="absolute right-3 w-5 h-5 text-gray-400 animate-spin" />
            )}
          </div>
        </div>
      </div>

      {/* RESULTS DROPDOWN */}
      {isOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug?.current}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {/* PRODUCT IMAGE */}
                  {product.images?.length > 0 && (
                    <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded">
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name || "Product"}
                        width={50}
                        height={50}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>

                    {product.price && (
                      <p className="text-sm text-gray-500">
                        ${product.price}
                        {product.discount && (
                          <span className="ml-2 line-through">
                            ${product.discount}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </Link>
              ))}

              <Link
                href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 text-sm text-shop_dark_green hover:bg-gray-50 border-t border-gray-200 font-medium"
              >
                View all results
              </Link>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;