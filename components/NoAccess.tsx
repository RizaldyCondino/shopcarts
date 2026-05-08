import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccess = () => {
  return (
    <div className="flex justify-center items-center  py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md py-5 px-5">
        <CardHeader className="flex items-center flex-col ">
          <Logo />
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="y-4 border-none">
          <p className="font-medium text-center text-darkColor/80">
            Login to your cart items and checkout. Don't miss out of your
            favorite products
          </p>
          <SignInButton mode="modal">
            <button className="text-center text-white bg-shop_dark_green/90 rounded-md w-full p-3 py-3 mt-5 hoverEffect hover:bg-shop_btn_dark_green/80 mb-2">
              Sign In
            </button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&rsquo;t have an account?
          </div>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full mb-5" size="lg">
              Create an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
