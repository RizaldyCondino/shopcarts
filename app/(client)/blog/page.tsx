import Container from "@/components/Container";
import LatestBlog from "@/components/LatestBlog";
import { Title } from "@/components/ui/text";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <Container>
      <div className="mb-10 lg:mb-20">
        <Title>Blog Page</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {blogs?.map((blog) => (
            <div key={blog?._id} className="rounded-lg overflow-hidden">
              {blog?.mainImage && (
                <Link href={`/blog/${blog.slug?.current}`}>
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt="blogImage"
                    width={500}
                    height={500}
                    className="w-full max-h-80 object-cover"
                  />
                </Link>
              )}
              <div className="bg-shop_light_bg p-5 ">
                <div className="flex text-xs items-center gap-5">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item) => (
                      <p
                        key={item}
                        className="font-semibold text-shop_dark_green tracking-wider"
                      >
                        {item}
                      </p>
                    ))}
                    {/* {blog?.blogcategories?.map((item, index) => (
                      <p
                        key={index}
                        className="semi-bold text-shop_dark_green tracking-wider"
                      >
                        {item?.title}
                      </p>
                    ))} */}
                    <span
                      className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px]
                  group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect
                  "
                    />
                  </div>
                  <p
                    className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer
                hover:text-shop_dark_green hoverEffect"
                  >
                    <Calendar size={15} /> {""}
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span
                      className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px]
                  group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect"
                    ></span>
                  </p>
                </div>
                <Link
                  href={`/blog/${blog.slug?.current}`}
                  className="tex-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BlogPage;
