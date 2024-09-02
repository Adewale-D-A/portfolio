import Image from "next/image";
import partners from "@/statics/assets/partner.json";

export default function InfiniteScroll() {
  const width = 50;
  return (
    <div
      style={{ height: width }}
      className={`w-full h-[${width}px]  wrapper whitespace-nowrap max-w-screen-xl relative overflow-hidden`}
    >
      {partners.map(({ id, logo, name }, index) => (
        <div
          className={`item item${index + 1} absolute`}
          key={id}
          style={
            {
              "--delay": `calc(30s / ${partners?.length} * (${
                partners?.length
              } - ${index + 1}) * -1)`,
              "--max": `max(calc(${width}px * ${partners?.length}), 100%)`,
              "--width": `${width}px`,
            } as any
          }
        >
          <Image
            src={logo}
            alt={name}
            height={300}
            width={300}
            className={`w-full h-auto aspect-square object-contain `}
          />
        </div>
      ))}
    </div>
  );
}
