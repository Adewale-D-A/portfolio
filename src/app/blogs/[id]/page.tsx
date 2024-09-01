import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductCategory from "@/components/cards/product-categories";
import blogContents from "@/statics/assets/blogs.json";
import Instagram from "@/statics/icons/instagram";
import LinkedIn from "@/statics/icons/linkedIn";
import Twitter from "@/statics/icons/twitter";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
//generate dynamic meta data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  try {
    const found = blogContents.find(
      (item) => item?.id?.toString() === id?.toString()
    );

    if (found) {
      return {
        title: found?.title,
        description: found?.summary,
      };
    } else {
      return {
        title: "Blog Post",
        description: "Mindwalks blogs",
      };
    }
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Mindwalks blogs",
    };
  }
}

const fetchBlogData = async (id: string) => {
  const notFoundContent = {
    id: 1,
    bannerImg: "/blog/climate_img_1.png",
    title: "Not Found",
    summary: "NOT FOUND",
    author: {
      name: "",
      avatar: "",
      socials: [
        {
          name: "linkedin",
          handle: "#",
        },
      ],
    },
    content: [],
  };
  try {
    const found = blogContents.find(
      (item) => item?.id?.toString() === id?.toString()
    );
    if (found) {
      return { isSuccess: true, ...found };
    } else return { isSuccess: false, ...notFoundContent };
  } catch (error) {
    return { isSuccess: false, ...notFoundContent };
  }
};

export default async function Blog({ params }: { params: { id: string } }) {
  const { isSuccess, author, title, content } = await fetchBlogData(params?.id);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {isSuccess ? (
        <>
          <section className="w-full flex justify-center my-10">
            <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10">
              <h3 className=" text-4xl font-semibold">{title}</h3>
              <div className=" w-full my-10 flex flex-col gap-4">
                {content?.map(({ id, description, image }) => {
                  return (
                    <div key={id} className=" text-left flex flex-col gap-2">
                      <p>{description}</p>
                      {image && (
                        <div className=" w-full flex justify-center items-center">
                          <Image
                            className="  w-auto h-full"
                            alt={title}
                            src={image || "/image_placeholder.png"}
                            height={500}
                            width={500}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div>
                <p className="italics">Written by:</p>
                <div className=" flex items-center gap-3">
                  <Image
                    src={author?.avatar || "/image_placeholder.png"}
                    alt="author"
                    height={200}
                    width={200}
                    className=" rounded-full h-16 w-16 aspect-square"
                  />
                  <div className=" flex flex-col gap-2">
                    <h6 className=" font-semibold">{author?.name}</h6>
                    <div className="flex items-center gap-3">
                      {author?.socials.find(
                        (social) => social.name === "twitter"
                      ) && (
                        <Link
                          href={
                            author?.socials.find(
                              (social) => social.name === "twitter"
                            )?.handle || "#"
                          }
                          target="_blank"
                          className=" hover:scale-125 transition-all"
                        >
                          <Twitter className="w-4 h-4" />
                        </Link>
                      )}
                      {author?.socials.find(
                        (social) => social.name === "linkedin"
                      ) && (
                        <Link
                          href={
                            author?.socials.find(
                              (social) => social.name === "linkedin"
                            )?.handle || "#"
                          }
                          target="_blank"
                          className=" hover:scale-125 transition-all"
                        >
                          <LinkedIn className="w-4 h-4" />
                        </Link>
                      )}
                      {author?.socials.find(
                        (social) => social.name === "instagram"
                      ) && (
                        <Link
                          href={
                            author?.socials.find(
                              (social) => social.name === "instagram"
                            )?.handle || "#"
                          }
                          target="_blank"
                          className=" hover:scale-125 transition-all"
                        >
                          <Instagram className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full flex justify-center my-10">
            <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10">
              <div className=" w-full flex flex-col gap-4">
                <h3 className=" text-4xl font-semibold">Similar blogs</h3>
                <p className=" text-grey_one-500">
                  Blogs recommendation that would interest you
                </p>
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
                      blog_category={"climate"}
                      blog_read_time={2}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="w-full flex justify-center my-10">
          <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10 my-16 justify-center items-center">
            <h4>404</h4>
            <h3 className=" text-4xl font-semibold">Blog Not found</h3>
          </div>
        </section>
      )}
    </div>
  );
}
