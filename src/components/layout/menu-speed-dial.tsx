import Link from "next/link";
import BlogsIcon from "@/statics/icons/blog";
import ContactIcon from "@/statics/icons/contact";
import HomeIcon from "@/statics/icons/home";
import MenuIcon from "@/statics/icons/menu";
import ProfileIcon from "@/statics/icons/profile";
import Projects from "@/statics/icons/projects";

export default function MenuSpeedDial() {
  return (
    <div className=" group flex flex-row-reverse gap-3 hover:shadow-lg shadow-white rounded-full pl-4">
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
            url: "#",
            icon: <HomeIcon />,
          },
          {
            id: 2,
            name: "Projects",
            url: "#",
            icon: <Projects />,
          },
          {
            id: 3,
            name: "Blogs",
            url: "#",
            icon: <BlogsIcon />,
          },
          {
            id: 4,
            name: "About",
            url: "#",
            icon: <ProfileIcon />,
          },
          {
            id: 5,
            name: "Contact",
            url: "#",
            icon: <ContactIcon />,
          },
        ].map((item) => (
          <Link
            href={item?.url}
            key={item?.id}
            title={item?.name}
            className=" hover:text-red-300"
          >
            {item?.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
