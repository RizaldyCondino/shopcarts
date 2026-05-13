import { sanityFetch } from "../lib/live";
import {
  BLOG_CATEGORIES,
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GET_ALL_BLOG,
  LATEST_BLOG_QUERY,
  My_ORDERS_QUERY,
  OTHERS_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_BY_IDS_QUERY,
  SINGLE_BLOG_QUERY,
} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
       ...,
       "productCount": count(*[_type == "product" && references(^._id)])
       }`
      : `*[_type == 'category'] | order(name asc){
       ...,
       "productCount": count(*[_type == "product" && references(^._id)])
       }`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log("Error fecthing categories", error);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands", error);
    return [];
  }
};

const getLatestBlog = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching latest blogs", error);
    return [];
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching deal Products", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

const getProductsByIds = async (ids: string[]) => {
  if (!ids || ids.length === 0) {
    return [];
  }

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_IDS_QUERY,
      params: { ids },
    });

    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by ids:", error);
    return [];
  }
};

const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: { slug },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error feching product by ID", error);
    return null;
  }
};

const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: My_ORDERS_QUERY,
      params: {
        userId,
      },
    });
    return orders?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID", error);
    return null;
  }
};

const getAllBlogs = async (quantity: number) => {
  try {
    const orders = await sanityFetch({
      query: GET_ALL_BLOG,
      params: {
        quantity,
      },
    });
    return orders?.data || null;
  } catch (error) {
    console.error("Error fetching blogs", error);
    return null;
  }
};
const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: {
        slug,
      },
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching single blogs", error);
    return null;
  }
};

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching blog categories:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
     console.log("Error fetching all other blog:", error);
    return [];
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlog,
  getDealProducts,
  getProductBySlug,
  getProductsByIds,
  getBrand,
  getMyOrders,
  getAllBlogs,
  getSingleBlog,
  getBlogCategories,
  getOthersBlog,
};
