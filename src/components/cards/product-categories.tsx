import ExtendIcon from "@/statics/icons/extend";
import Image from "next/image";
import Link from "next/link";

export default function ProductCategory({
  title,
  description,
  url,
  image_url,
  blog_category,
  blog_read_time,
}: {
  title: string;
  description: string;
  url: string;
  image_url?: string;
  blog_category?: string;
  blog_read_time?: number;
}) {
  return (
    <div
      className={`w-full flex flex-col-reverse gap-5 justify-end items-stretch shadow-md`}
    >
      <div className=" h-full flex flex-col gap-4 max-w-80">
        <h6 className=" text-lg font-semibold">{title}</h6>
        <p className=" text-grey_one-500 text-sm line-clamp-3">{description}</p>
        <div className=" flex gap-4 items-center my-10 md:mt-16">
          <span className=" p-3 px-5 rounded-full bg-grey_one-500/10">
            {blog_category}
          </span>
          <span>{blog_read_time} min read</span>
        </div>
      </div>
      <Link
        href={url}
        className={`bg-contain group bg-right-bottom bg-no-repeat rounded-t-lg min-h-52 h-full overflow-hidden w-full relative group`}
      >
        <Image
          src={image_url ? image_url : "/image_placeholder.png"}
          alt={title}
          height={500}
          width={500}
          className="w-full h-full object-cover"
        />
        <div className=" aspect-square h-8 group-hover:h-full group-hover:w-full group-hover:bg-menu-gradient group-hover:opacity-40 transition-all bg-black flex items-start justify-end absolute bottom-0 left-0">
          <ExtendIcon className="w-4 h-4  text-white group-hover:w-10 group-hover:h-10" />
        </div>
      </Link>
    </div>
  );
}
