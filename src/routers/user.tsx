import InfoModify from "@/views/InfoModify";
import PasswordModify from "@/views/PasswordModify";
import type { RouteObject } from "react-router-dom";

const userRoutes: RouteObject[] = [
  {
    path: "info_modify",
    Component: InfoModify,
  },
  {
    path: "password_modify",
    Component: PasswordModify,
  },
];

export default userRoutes;
