import React from "react";

const Users = React.lazy(() => import("./pages/users"));
const History = React.lazy(() => import("./pages/history"));
const NotFound = React.lazy(() => import("./pages/notfound"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/users", name: "User", element: Users },
  { path: "/history", name: "History", element: History },
  { path: "*", name: "NotFound", element: NotFound },
];

export default routes;
