"use client";
import { MyORDERSQUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { format } from "date-fns";
import PriceFormatter from "./PriceFormatter";
import { X } from "lucide-react";
import OrderDetailDialog from "./OrderDetailDialog";

const OrdersComponents = ({ orders }: { orders: MyORDERSQUERYResult }) => {
   const [selectOrder, setSelectedOrder] = useState<MyORDERSQUERYResult[number] | null>
    (null);
  // const handleOrderClick = (order: MyORDERSQUERYResult[number])=>{
  //  setSelectedOrder(order);
  // };
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order?.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100 h-12"
                  onClick={()=> setSelectedOrder(order)}
                >
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate &&
                      format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{order?.customerName}</TableCell>
                  <TableCell className="sm:table-cell">
                    {order?.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={order?.totalPrice}
                      className="text-black font-medium"
                    />
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`px-1 py-1 rounded-full text-xs font-semibold ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order?.status.charAt(0).toUpperCase() +
                          order?.status.slice(1)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {order?.invoice && (
                      <p className="font-medium  line-clamp-1">
                        {order?.invoice ? order?.invoice?.number : "----"}
                      </p>
                    )}
                  </TableCell>
                  <TableCell 
                  // onClick={(event)=>{
                  //   event.stopPropagation();
                  //   handleDelete();
                  // }}
                  className="flex items-center justify-center group">
                    <X
                      size={20}
                      className="group-hover:text-shop_dark_green hoverEffect text-shop_btn_dark_green hover:text-shop_orange/80"
                    />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog order={selectOrder} isOpen={!!selectOrder} onClose={()=> setSelectedOrder(null)}/>

    </>
  );
};

export default OrdersComponents;
