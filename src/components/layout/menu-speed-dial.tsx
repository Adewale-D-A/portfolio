"use client";

import Link from "next/link";
import BlogsIcon from "@/statics/icons/blog";
import ContactIcon from "@/statics/icons/contact";
import HomeIcon from "@/statics/icons/home";
import MenuIcon from "@/statics/icons/menu";
import ProfileIcon from "@/statics/icons/profile";
import Projects from "@/statics/icons/projects";
import { useRouter } from "next/navigation";
import NavigateBackIcon from "@/statics/icons/navigate-back";

export default function MenuSpeedDial() {
  const router = useRouter();
  return (
    <div className=" group flex flex-row-reverse gap-3 hover:shadow-lg shadow-white bg-white dark:bg-dark rounded-full pl-4">
      <button
        title="menu"
        type="button"
        className=" group-hover:rotate-90 transition-all text-white aspect-square rounded-full menu-icon-bg p-2"
      >
        <MenuIcon />
      </button>
      <div className="flex flex-row-reverse items-center gap-5 w-0 group-hover:w-full transition-all overflow-hidden">
        {[
          {
            id: 1,
            name: "Home",
            url: "/",
            icon: <HomeIcon />,
          },
          {
            id: 2,
            name: "Projects",
            url: "/projects",
            icon: <Projects />,
          },
          {
            id: 3,
            name: "Blogs",
            url: "/blogs",
            icon: <BlogsIcon />,
          },
          {
            id: 4,
            name: "About",
            url: "/about-me",
            icon: <ProfileIcon />,
          },
          {
            id: 5,
            name: "Contact",
            url: "/contact-me",
            icon: <ContactIcon />,
          },
          {
            id: 6,
            name: "Back",
            url: "/",
            icon: <ContactIcon />,
            isButton: true,
            clickHandler: router.back,
          },
        ].map((item) => {
          if (item?.isButton) {
            return (
              <button
                key={item?.id}
                type="button"
                title={item?.name}
                onClick={() => item?.clickHandler()}
                className=" hover:text-red-300"
              >
                <NavigateBackIcon />
              </button>
            );
          } else {
            return (
              <Link
                href={item?.url}
                key={item?.id}
                title={item?.name}
                className=" hover:text-red-300"
              >
                {item?.icon}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
