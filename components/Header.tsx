import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";

import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { currentUser, auth } from "@clerk/nextjs/server";
import { ClerkLoaded, Show, SignInButton, UserButton } from "@clerk/nextjs";
import FavoriteButtonDb from "./FavoriteButtonDb";
import { getMyOrders } from "@/sanity/queries";
import { getFavoritesCount } from "@/lib/getFavoritesCount";
import { Logs } from "lucide-react";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  let initialFavoritesCount = 0;
  if (userId) {
    orders = await getMyOrders(userId);
    initialFavoritesCount = await getFavoritesCount(userId);
  }

  return (
    <header className="bg-white/70 py-5 sticky top-0 z-50  backdrop-blur-md ">
      <Container className="flex item-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <CartIcon />
          <FavoriteButtonDb initialCount={initialFavoritesCount} />
          <ClerkLoaded>
            <Show when="signed-in">
              <Link
                href={"/orders"}
                className="group relative hover:text-shop_light_green"
              >
                <Logs />
                <span className="absolute -top-0.5 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  {orders?.length ? orders?.length : 0}
                </span>
              </Link>
              <UserButton />
            </Show>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
