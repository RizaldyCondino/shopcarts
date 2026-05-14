"use client";

import { Search, Loader2 } from "lucide-react";
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  // AUTO FOCUS
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      setResults(data.products || []);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
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

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setIsOpen(false);
        setSearchQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="relative w-full max-w-md"
    >
      <div className="flex items-center justify-end">
        {/* SEARCH BUTTON */}
        {!isExpanded && (
          <button
            onClick={toggleSearch}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
          >
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        )}

        {/* INPUT */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-1 focus:ring-shop_dark_green"
            />

            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {isOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white text-black border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug?.current}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
                >
                  {product.images?.length > 0 && (
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name || "Product"}
                        width={50}
                        height={50}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))}

              <Link
                href={`/shop?search=${encodeURIComponent(
                  searchQuery
                )}`}
                className="block text-center py-3 text-sm font-medium text-shop_dark_green border-t border-gray-200"
              >
                View all results
              </Link>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;