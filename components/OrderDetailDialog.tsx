import { MyORDERSQUERYResult } from "@/sanity.types";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";

interface OrderDetailsIsDialogProps {
  order: MyORDERSQUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsIsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - {order?.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Customer: {order.customerName}</strong>
          </p>
          <p>
            <strong>Email: {order.email}</strong>
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {order.status}
            </span>
          </p>
          {order?.invoice?.hosted_invoice_url && (
            <Button
              asChild
              className="bg-border border text-darkColor/80 mt-2 hover:text-white hover:bg-shop_btn_dark_green hoverEffect"
            >
              <Link href={order.invoice.hosted_invoice_url} target="_blank">
                Download Invoice
              </Link>
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-0">
                    {product?.product?.images?.[0] && (
                      <Image
                        src={urlFor(product.product.images[0]).url()}
                        alt={product?.product?.name || "Product image"}
                        width={50}
                        height={50}
                        className="border rounded-sm flex-shrink-0"
                      />
                    )}

                    <p className="truncate max-w-[250px]">
                      {product?.product?.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter
                    amount={product?.product?.price}
                    className="text-black font-medium"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
