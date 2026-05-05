import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <Container className=" bg-shop_light_pink">
      <HomeBanner/>
    </Container>
=======
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/sanity/queries";
import React from "react";

const Home = async() => {
  const categories = await getCategories(6);
  // console.log(categories);
   
  return (
    <Container className=" ">
      <HomeBanner />
        <ProductGrid />
      <HomeCategories categories={categories}/>
      <ShopByBrands/>
      <LatestBlog/>
    </Container> 
>>>>>>> 7558155 (Hot Deals Done)
  );
};

export default Home;
