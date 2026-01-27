import type { RouteObject } from "react-router-dom";
import Login from "@/views/Login";

const authRoutes: RouteObject[] = [
  {
    path: "Login",
    Component: Login,
  },
];

export default authRoutes;
