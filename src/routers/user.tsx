import InfoModify from "@/views/InfoModify";
import PasswordModify from "@/views/PasswordModify";
import type { RouteObject } from "react-router-dom";

const userRoutes: RouteObject[] = [
  {
    path: "info_modify",
    Component: InfoModify,
    handle: {
      label: "信息修改",
    },
  },
  {
    path: "password_modify",
    Component: PasswordModify,
    handle: {
      label: "密码修改",
    },
  },
];

export default userRoutes;
