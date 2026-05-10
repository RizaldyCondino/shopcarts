import NoAccess from "@/components/NoAccess";
import WishListProduct from "@/components/WishListProduct";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();

  return <>{user 
  ? <div><WishListProduct/></div> 
  : <NoAccess/>}</>;
};

export default WishListPage;
