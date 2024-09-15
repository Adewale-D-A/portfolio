import type { Metadata } from "next";
import blogContents from "@/statics/assets/blogs.json";

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
        title: "Project",
        description: "My portfolio projects",
      };
    }
  } catch (error) {
    return {
      title: "Project",
      description: "My portfolio projects",
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

export default async function AboutMoreDetails({
  params,
}: {
  params: { id: string };
}) {
  const { isSuccess, author, title, content } = await fetchBlogData(params?.id);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {isSuccess ? (
        <>
          <section className="w-full flex justify-center my-10">
            <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10">
              <h1 className=" text-4xl font-semibold">Project X</h1>
            </div>
          </section>
        </>
      ) : (
        <section className="w-full flex justify-center my-10">
          <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10 my-16 justify-center items-center">
            <h4>404</h4>
            <h3 className=" text-4xl font-semibold">Project Not found</h3>
          </div>
        </section>
      )}
    </div>
  );
}
