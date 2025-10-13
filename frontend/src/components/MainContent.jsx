
import Content from "./Content";
const headings = ["Backlog", "To do", "In progress", "Designed"];

function Main() {
  return (
    <div className="flex w-full gap-3 mt-4 items-start" >
      {headings.map((heading, index) => (
        <Content key={index} heading={heading} />
      ))}
    </div>
  );
}
export default Main