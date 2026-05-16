import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hooks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/hooks/"!</div>;
}
