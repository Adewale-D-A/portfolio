import InfiniteScroll from "@/components/animation-effects/infinite-scroll";
import ProjectCard from "@/components/cards/projects";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "versatile portfolio of projects and experiences.",
};

export default function Projects() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-16 max-w-screen-xl px-5 md:px-10 py-10">
        <div className="w-full flex flex-col md:flex-row gap-10 shadow-lg p-3 items-center">
          <div className=" flex w-full flex-1 md:flex-[0.5] flex-col gap-5">
            <div className="w-full">
              <h2 className=" text-7xl font-arizonia">Portfolio.</h2>
              <p className=" text-xl max-w-md dark:text-gray-300 text-gray-600">
                Check out my latest project case study.
              </p>
            </div>
            <p>
              Versatile in multiple technologies and design schemes essential
              for implementing specific design pattern targeted towards
              business&apos; core users.
            </p>
            <InfiniteScroll />
          </div>
          <div className=" w-full flex flex-1 md:flex-[0.5] rounded-md overflow-hidden max-h-72">
            <Image
              src={"/image_placeholder.png"}
              alt="latest project"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* projects cards */}
        <div className=" w-full grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <ProjectCard key={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
