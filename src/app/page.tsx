import TypewriteEffect from "@/components/animation-effects/typewriter-effect";
export default function Home() {
  return (
    <main className="min-h-screen menu-icon-bg right-left-flare flex-col items-stretch py-1 justify-center overflow-hidden">
      <section className="w-full dark:bg-gray-800 bg-white h-[calc(100vh-0.5rem)] flex flex-col items-center justify-center ">
        <div className=" transition-all">
          <p className="">I love to innovate, create, build & develop</p>
          <h1 className=" text-7xl font-semibold font-arizonia">Adewale</h1>
          <div className=" flex items-center gap-1">
            <p className=" flex items-center gap-2">I</p>
            <TypewriteEffect
              listItems={[
                {
                  id: "1",
                  label: "develop frontend services (Next.js & React.js)",
                },
                {
                  id: "2",
                  label: "develop backend services (Node.js)",
                },
                {
                  id: "3",
                  label: "write C++ codes for robotics",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
