import CursorIcon from "@/statics/icons/cursor";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  url,
  name,
  category,
  mainUrl,
  miniUrl,
}: {
  url: string;
  name: string;
  category?: string;
  mainUrl: string;
  miniUrl: string;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Link
        href={mainUrl}
        target="_blank"
        className=" w-full h-32 overflow-hidden rounded-t"
      >
        <Image
          src={url ? url : "/image_placeholder.png"}
          alt="project 1"
          height={300}
          width={300}
          className=" w-full h-full object-cover md:object-left-top"
        />
      </Link>
      <div className=" p-2 shadow-md rounded-b relative">
        <h6 className=" font-semibold">{name}</h6>
        <span className=" text-xs">{category}</span>
        <Link
          href={miniUrl}
          className="menu-icon-bg rounded-full absolute bottom-1 right-2 group"
        >
          <CursorIcon className=" h-4 w-4 group-hover:scale-125 transition-all" />
        </Link>
      </div>
    </div>
  );
}
