import TypewriteEffect from "@/component/animation-effects/typewriter-effect";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center border-gradient border-4 border-solid overflow-hidden">
      <div className=" transition-all">
        <p className="">I love to innovate, create, build, develop</p>
        <h1 className=" text-7xl font-semibold font-arizonia">Adewale</h1>
        <div className=" flex items-center gap-1">
          <p className=" flex items-center gap-2">I develop in</p>
          <TypewriteEffect
            listItems={[
              {
                id: "1",
                label: "Next.js",
              },
              {
                id: "2",
                label: "React.js",
              },
              {
                id: "3",
                label: "Node.js",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
