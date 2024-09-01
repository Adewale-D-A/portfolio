import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "versatile portfolio of projects and experiences.",
};

export default function Projects() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-5 max-w-screen-xl px-5 md:px-10 py-10">
        <h1 className=" font-semibold text-3xl">My Portfolio</h1>
      </div>
    </section>
  );
}
