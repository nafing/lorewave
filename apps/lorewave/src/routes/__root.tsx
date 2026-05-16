import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import classes from "./root-layout.module.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header />
      </div>

      <Outlet />
    </div>
  );
}
