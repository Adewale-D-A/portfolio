import { Metadata } from "next";
import MailIcon from "@/statics/icons/mail";
import Link from "next/link";
import LinkedIn from "@/statics/icons/linkedIn";
import GithubIcon from "@/statics/icons/github";
import WhatsAppIcon from "@/statics/icons/whatsapp";

export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Reach out to me, let's collaborate on new and  exciting projects.",
};

export default function ConatctMe() {
  const BASE_URL = process.env.NEXT_PUBLIC_PROJECT_IMG_BASE_URL;
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-16 max-w-screen-xl px-5 md:px-10 py-10">
        <div className="w-full flex flex-col md:flex-row gap-10 p-3 shadow-lg items-center">
          <div className=" flex w-full flex-1 md:flex-[0.5] flex-col gap-5 ">
            <div className="w-full ">
              <h2 className=" text-7xl font-arizonia">Contact Me.</h2>
              <p className=" text-xl max-w-md dark:text-gray-300 text-gray-600">
                Reach out to me, I love to take on new and exciting challenges.
              </p>
            </div>
            <p className="">
              Do you have a project, an application or an idea that requires a{" "}
              <span className=" font-semibold text-purple-500">creative </span>{" "}
              approach,{" "}
              <span className=" font-semibold text-purple-500">unique</span>{" "}
              solution,{" "}
              <span className=" font-semibold text-purple-500">
                stunning visuals
              </span>
              ? Reach out to me, I would love to collaborate with you.
            </p>
          </div>
        </div>
        <div className=" flex items-center gap-5 flex-wrap">
          {[
            {
              id: 1,
              icon: <MailIcon className=" size-9" />,
              url: "mailto:adewale.d.a@outlook.com",
              name: "Mail",
            },
            {
              id: 2,
              icon: <LinkedIn className=" size-9" />,
              url: "https://www.linkedin.com/in/adewale-d-azeez/",
              name: "LinkedIn",
            },
            {
              id: 3,
              icon: <GithubIcon className=" size-9" />,
              url: "https://github.com/Adewale-D-A",
              name: "Github",
            },
            {
              id: 4,
              icon: <WhatsAppIcon className=" size-9" />,
              url: "https://wa.me/+2347056944506",
              name: "Whatsapp",
            },
          ].map((item) => (
            <Link
              title={item?.name}
              key={item?.id}
              href={item?.url}
              target="_blank"
              className=""
            >
              <div className=" bg-dark dark:bg-white text-white dark:text-dark w-fit p-1 rounded-full">
                {item?.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
