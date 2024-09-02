import Image from "next/image";
import Link from "next/link";

export default function ProjectCard() {
  return (
    <div className=" flex flex-col gap-2 p-3 rounded-md shadow">
      <Link href={"#"} className=" w-full h-32 overflow-hidden rounded">
        <Image
          src={"/image_placeholder.png"}
          alt="project 1"
          height={300}
          width={300}
          className=""
        />
      </Link>
      <div>
        <h6>Farmers AgriTech Solution</h6>
        <p className=" text-sm">Web App</p>
      </div>
    </div>
  );
}
