"use client";

import { useCallback, useState } from "react";
import projects from "@/statics/assets/projects.json";
import ProjectCard from "@/components/cards/projects";
const BASE_URL = process.env.NEXT_PUBLIC_PROJECT_IMG_BASE_URL;

export default function FilterProjectCards() {
  const [filtered, setFiltered] = useState(projects);
  const [currentValue, setCurrentVaue] = useState("all");

  const handleFilter = useCallback(
    (keyword: "all" | "website" | "web-app" | "website+app") => {
      const filteredData = projects.filter((item) =>
        item?.type.toLowerCase().includes(keyword.toLowerCase())
      );
      setCurrentVaue(keyword);
      setFiltered(keyword === "all" ? projects : filteredData);
    },
    []
  );
  return (
    <div className=" flex flex-col gap-7">
      <div className=" flex items-center gap-2">
        <button
          className={`${
            currentValue === "all" ? "menu-icon-bg" : "hover:shadow-md"
          } p-1 rounded-full px-4`}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={`${
            currentValue === "website" ? "menu-icon-bg" : "hover:shadow-md"
          } p-1 rounded-full px-4`}
          onClick={() => handleFilter("website")}
        >
          Websites
        </button>
        <button
          className={`${
            currentValue === "web-app" ? "menu-icon-bg" : "hover:shadow-md"
          } p-1 rounded-full px-4`}
          onClick={() => handleFilter("web-app")}
        >
          Apps
        </button>
        <button
          className={`${
            currentValue === "website+app" ? "menu-icon-bg" : "hover:shadow-md"
          } p-1 rounded-full px-4`}
          onClick={() => handleFilter("website+app")}
        >
          Website + Apps
        </button>
      </div>
      {/* projects cards */}
      <div className=" w-full grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-10">
        {filtered.map((item) => (
          <ProjectCard
            name={item?.name}
            category={item?.category}
            url={`${BASE_URL}${item?.images[0]}`}
            key={item?.id}
            mainUrl={item?.link}
            miniUrl={`/projects/${item?.id}`}
          />
        ))}
      </div>
    </div>
  );
}
