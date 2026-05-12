"use client";

import useStore from "@/store";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SuccessClient() {
  const { resetCart } = useStore();
  const searchParams = useSearchParams();

  const session_id = searchParams.get("session_id");
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (session_id) {
      resetCart();
    }
  }, [session_id, resetCart]);

  return (
    <div className="py-5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full text-center">

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Check className="text-white w-10 h-10" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-700 text-center">
          Order Number:{" "}
          <span className="font-semibold">
            {orderNumber ?? "Processing..."}
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Link href="/" className="bg-black text-white py-3 rounded-lg">
            <Home className="inline w-5 h-5 mr-2" />
            Home
          </Link>

          <Link href="/orders" className="border py-3 rounded-lg">
            <Package className="inline w-5 h-5 mr-2" />
            Orders
          </Link>

          <Link href="/shop" className="bg-black text-white py-3 rounded-lg">
            <ShoppingBag className="inline w-5 h-5 mr-2" />
            Shop
          </Link>
        </div>

      </div>
    </div>
  );
}