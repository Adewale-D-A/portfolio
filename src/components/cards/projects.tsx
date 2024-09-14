import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  url,
  name,
  category,
}: {
  url: string;
  name: string;
  category: string;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Link href={"#"} className=" w-full h-32 overflow-hidden rounded-t">
        <Image
          src={url ? url : "/image_placeholder.png"}
          alt="project 1"
          height={300}
          width={300}
          className=" w-full h-full object-cover md:object-left-top"
        />
      </Link>
      <div className=" p-2 shadow-md rounded-b">
        <h6 className=" font-semibold">{name}</h6>
        <span className=" text-xs">{category}</span>
      </div>
    </div>
  );
}
