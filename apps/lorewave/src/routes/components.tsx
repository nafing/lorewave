import { createFileRoute, Outlet } from "@tanstack/react-router";
import Aside from "../components/Aside";
import classes from "./root-layout.module.css";

export const Route = createFileRoute("/components")({
  component: RouteComponent,
});

const navItems = [
  {
    label: "Box",
    description: "Basic building block for layout and styling",
    href: "/components/box",
  },
  {
    label: "Paper",
    description: "Structure your long-form draft",
    href: "/components/paper",
  },
  {
    label: "Stack",
    description: "Arrange elements in a vertical or horizontal stack",
    href: "/components/stack",
  },
  {
    label: "Group",
    description: "Arrange elements in a horizontal group",
    href: "/components/group",
  },
  {
    label: "Title",
    description: "Headings with different levels and styles",
    href: "/components/title",
  },
  {
    label: "Text",
    description: "Paragraphs, labels, and other text elements",
    href: "/components/text",
  },
  {
    label: "Button",
    description: "Trigger actions with various styles and sizes",
    href: "/components/button",
  },
  {
    label: "Code",
    description: "Inline and block code snippets with monospace styling",
    href: "/components/code",
  },
];

function RouteComponent() {
  return (
    <>
      <div className={classes.sidebar}>
        <Aside navItems={navItems} />
      </div>
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}
