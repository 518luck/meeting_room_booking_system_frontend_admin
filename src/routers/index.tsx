import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AuthLayout from "@/Layouts/AuthLayout";
import MainLayout from "@/Layouts/MainLayout";
import authRoutes from "@/routers/auth";
import ErrorPage from "@/Layouts/ErrorPage";
import mainRoutes from "@/routers/main";
import userRoutes from "@/routers/user";

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
    path: "/user",
    Component: MainLayout,
    children: [...userRoutes],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
];

const router = createBrowserRouter(routes);

export default router;
