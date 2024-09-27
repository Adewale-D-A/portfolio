import ProjectCard from "@/components/cards/projects";
import { Metadata } from "next";
import awards from "@/statics/assets/awards.json";
import workexperience from "@/statics/assets/workexperience.json";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me",
  description: "Get to know Azeez Adewale.",
};

export default function Projects() {
  const BASE_URL = process.env.NEXT_PUBLIC_PROJECT_IMG_BASE_URL;
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-16 max-w-screen-xl px-5 md:px-10 py-10">
        <div className="w-full flex flex-col md:flex-row gap-10 p-3 shadow-lg items-center">
          <div className=" flex w-full flex-1 md:flex-[0.5] flex-col gap-5 ">
            <div className="w-full ">
              <h2 className=" text-7xl font-arizonia">About Me.</h2>
              <p className=" text-xl max-w-md dark:text-gray-300 text-gray-600">
                Get to know the latest updates about me
              </p>
            </div>
            <p className="">
              Thrive, versatility, and a passion for learning are the core
              values that drive me. I am a highly motivated and organized. I am
              a{" "}
              <span className=" font-semibold text-purple-500">
                quick learner
              </span>{" "}
              and a{" "}
              <span className=" font-semibold text-purple-500">
                team player
              </span>
              . I am always looking for opportunities to learn and grow. I am a{" "}
              <span className=" font-semibold text-purple-500">
                problem solver
              </span>{" "}
              and a{" "}
              <span className=" font-semibold text-purple-500">
                critical thinker
              </span>
              .
            </p>
          </div>
        </div>

        {/* current project */}
        <div className=" flex flex-col gap-4">
          <h2 className=" text-2xl font-arizonia">Current Project.</h2>
          <div className=" w-full rounded-md overflow-hidden max-h-72 shadow-lg flex items-center justify-center">
            <Image
              src={
                `${BASE_URL}/screenshotsdata/fingerprint/fingerprint_web.gif` ||
                "/image_placeholder.png"
              }
              alt="latest project"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* brief summary */}
        <div className=" flex flex-col gap-4">
          <h2 className=" text-2xl font-arizonia">Brief Summary.</h2>
          <div className=" w-full rounded-md shadow-lg p-3">
            <p>
              <span className=" font-semibold text-purple-500">
                {" "}
                B.Eng in Electrical and Electronics Engineering{" "}
              </span>{" "}
              at the University of Ilorin from 2018-2024.
              <br /> Work experience in Software Engineering (Fullstack
              Development).
            </p>
          </div>
        </div>

        {/* stacks */}
        <div className=" flex flex-col gap-4">
          <h2 className=" text-2xl font-arizonia">Software Stacks.</h2>
          <div className=" w-full rounded-md shadow-lg p-3 flex items-center gap-4 flex-wrap">
            {[
              "React.js",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Docker",
              "Node.js",
              "C++",
              "AWS",
              "AZURE",
              "MySQL",
            ].map((item) => (
              <span key={item} className=" rounded-md bg-purple-500/15 p-3">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* work experience */}
        <div className=" flex flex-col gap-4">
          <h2 className=" text-2xl font-arizonia">Work Experience.</h2>
          <div className=" w-full rounded-md shadow-lg p-3 flex items-center flex-col gap-4 flex-wrap">
            {workexperience?.map((item) => (
              <div
                key={item?.id}
                className="w-full flex items-start gap-3 md:gap-10 border-b py-4"
              >
                <div className=" flex flex-[0.3]">
                  <h6>{item?.date}</h6>
                </div>
                <div className=" flex flex-[0.7] flex-col gap-3">
                  <div>
                    <h3 className=" text-lg font-semibold">{item?.role}</h3>
                    <span className=" text-sm italic">{item?.company}</span>
                    <p>{item?.about}</p>
                  </div>
                  <div>
                    <h6 className=" italic">Responsibilities</h6>
                    <ol className=" list-disc ml-10">
                      {item?.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* awards */}
        <div className=" flex flex-col gap-4">
          <h2 className=" text-2xl font-arizonia">Awards.</h2>
          <div className=" w-full grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-10">
            {awards.map((item) => (
              <ProjectCard
                name={item?.name}
                url={`${BASE_URL}${item?.image}`}
                key={item?.id}
                mainUrl="#"
                miniUrl="#"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
