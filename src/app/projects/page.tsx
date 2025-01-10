import { Metadata } from "next";
import Image from "next/image";
import InfiniteScroll from "@/components/animation-effects/infinite-scroll";
import FilterProjectCards from "@/components/cards/filter-project-cards";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "versatile portfolio of projects and experiences gather from my journey as a software engineer.",
};

export default function Projects() {
  const BASE_URL = process.env.NEXT_PUBLIC_PROJECT_IMG_BASE_URL;
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-16 max-w-screen-xl px-5 md:px-10 py-10">
        <div className="w-full flex flex-col md:flex-row gap-10 shadow-lg items-center">
          <div className=" flex w-full flex-1 md:flex-[0.5] flex-col gap-5">
            <div className="w-full px-3">
              <h2 className=" text-7xl font-arizonia">Portfolio.</h2>
              <p className=" text-xl max-w-md dark:text-gray-300 text-gray-600">
                Check out my latest project case study.
              </p>
            </div>
            <p className="px-3">
              Versatile in multiple technologies and design schemes essential
              for implementing specific design pattern targeted towards
              business&apos; core users.
            </p>
            <InfiniteScroll />
          </div>
          <div className=" w-full flex flex-1 md:flex-[0.5] rounded-md overflow-hidden max-h-72">
            <Image
              src={`/screenshotsdata/fingerprint/fingerprint_web.gif`}
              alt="latest project"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </div>
        <FilterProjectCards />
      </div>
    </section>
  );
}
