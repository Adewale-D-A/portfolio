export default function TypeWriterEffect({
  listItems,
}: {
  listItems: { id: string; label: string }[];
}) {
  const height = 20;
  return (
    <ul
      className="dynamic-text overflow-hidden"
      style={
        {
          "--steps": `slide 6s steps(${listItems?.length}) infinite`,
          "--itemheight": `${height}px`,
          "--totalheight": `-${height * listItems?.length}px`,
        } as any
      }
    >
      {listItems.map((item) => (
        <li key={item?.id} className="">
          <span className=" text-lg">{item?.label}</span>
        </li>
      ))}
    </ul>
  );
}
