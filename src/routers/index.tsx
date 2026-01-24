import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AuthLayout from "@/Layouts/AuthLayout";
import MainLayout from "@/Layouts/MainLayout";
import authRoutes from "@/routers/auth";
import ErrorPage from "@/Layouts/ErrorPage";
import mainRoutes from "@/routers/main";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: MainLayout,
    children: [...mainRoutes],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [...authRoutes],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
];

const router = createBrowserRouter(routes);

export default router;
