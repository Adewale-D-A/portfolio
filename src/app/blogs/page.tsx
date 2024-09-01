import ProductCategory from "@/components/cards/product-categories";
import blogContents from "@/statics/assets/blogs.json";
import ExtendIcon from "@/statics/icons/extend";
import NavigateNextIcon from "@/statics/icons/navigate-next";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs",
  description: "State of the art blog contents",
};

export default function Blogs() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10">
        <div className=" w-full flex flex-col gap-4">
          <Link href={"#"} className=" text-4xl font-semibold">
            Through my mind
          </Link>
          <p className=" text-grey_one-500">
            Impactful blog contents. Let's learn together
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 my-10">
          <div>
            <Link
              href={"#"}
              className=" text-lg font-semibold flex items-center gap-2 hover:gap-4 transition-all"
            >
              <span>Blog of the month : How to Organize your files</span>{" "}
              <NavigateNextIcon />
            </Link>
          </div>
          <Link href={"#"} className="w-full max-h-60 h-full relative group">
            <Image
              src={"/image_placeholder.png"}
              alt={"blog of the month"}
              height={500}
              width={500}
              className="w-full h-full rounded-t-lg object-cover"
            />
            <div className=" aspect-square h-8 group-hover:h-full group-hover:w-full group-hover:bg-menu-gradient group-hover:opacity-40 transition-all bg-black flex items-start justify-end absolute bottom-0 left-0">
              <ExtendIcon className="w-4 h-4  text-white group-hover:w-10 group-hover:h-10" />
            </div>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {blogContents.map((item) => {
            return (
              <ProductCategory
                key={item?.id}
                title={item?.title}
                description={item?.summary}
                url={`/blogs/${item?.id}`}
                image_url={item?.bannerImg}
                blog_category={item?.category}
                blog_read_time={2}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
