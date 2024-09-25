import type { Metadata } from "next";
import projectContents from "@/statics/assets/projects.json";
import Image from "next/image";
import CodeIcon from "@/statics/icons/code";
import CursorIcon from "@/statics/icons/cursor";
import Link from "next/link";

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
    const found = projectContents.find(
      (item) => item?.id?.toString() === id?.toString()
    );

    if (found) {
      return {
        title: found?.name,
        description: found?.about,
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
    id: "none-found",
    name: "Portfolio",
    type: "Website",
    link: "#",
    category: "Portfolio",
    stacks: ["Next.js", "TypeScript", "Docker", "AWS"],
    images: ["image_placeholder.png"],
    about: "My personal portfolios.",
  };
  try {
    const found = projectContents.find(
      (item) => item?.id?.toString() === id?.toString()
    );
    if (found) {
      return { isSuccess: true, ...found };
    } else return { isSuccess: false, ...notFoundContent };
  } catch (error) {
    return { isSuccess: false, ...notFoundContent };
  }
};

export default async function Project({ params }: { params: { id: string } }) {
  const BASE_URL = process.env.NEXT_PUBLIC_PROJECT_IMG_BASE_URL;

  const { isSuccess, name, type, link, category, stacks, images, about } =
    await fetchBlogData(params?.id);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {isSuccess ? (
        <>
          <section className="w-full flex justify-center my-10">
            <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10">
              <div className=" w-full flex items-center justify-center rounded-md overflow-hidden max-h-72 h-full bg-slate-400">
                <div className=" flex flex-col items-end">
                  <h2 className=" text-7xl text-center font-arizonia">
                    {name}
                  </h2>
                  <span className=" italic">{type}</span>
                </div>
              </div>
              <p>{about}</p>
              <div className="w-full justify-center items-center grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map((item) => (
                  <div key={item} className=" w-full aspect-square">
                    <Image
                      alt="project-images"
                      height={200}
                      width={200}
                      src={`${BASE_URL}${item}`}
                      className=" object-cover w-full h-full rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className=" flex items-center gap-3 flex-wrap">
                <CodeIcon />:
                {stacks?.map((item) => (
                  <span key={item} className=" text-sm rounded p-2">
                    {item}
                  </span>
                ))}
              </div>
              <div className=" flex items-center gap-4">
                <CursorIcon /> :{" "}
                <Link
                  href={link}
                  target="_blank"
                  className="menu-icon-bg px-2 p-1 rounded"
                >
                  visit
                </Link>
              </div>
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
