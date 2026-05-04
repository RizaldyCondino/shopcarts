import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SeachBar from "./SeachBar";
import CartIcon from "./CartIcon";
import FavoriteBtn from "./FavoriteBtn";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import {
  ClerkLoaded,
  Show,

  UserButton
} from "@clerk/nextjs";

const Header = async () => {
  const user = await currentUser();
  console.log(user, "user");
  return (
    <header className="bg-white/70 py-5 sticky top-0 z-50  backdrop-blur-md ">
      <Container className="flex item-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SeachBar />
          <CartIcon />
          <FavoriteBtn />
          <ClerkLoaded>
             <Show when="signed-in">
              <UserButton />
            </Show>
            
            {!user && <SignIn />}
            {/* <Show when="signed-out">
              <SignIn />
            </Show> */}
          </ClerkLoaded>
        </div>
        {/* NavAdmin */}
      </Container>
    </header>
  );
};

export default Header;
