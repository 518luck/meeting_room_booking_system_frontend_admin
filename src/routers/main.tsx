import Aaa from "@/views/Aaa";
import Bbb from "@/views/Bbb";
import BookingManage from "@/views/BookingManage";
import MeetingRoomManage from "@/views/MeetingRoomManage";
import Statistics from "@/views/Statistics";
import UserManage from "@/views/UserManage";
import type { RouteObject } from "react-router-dom";

const mainRoutes: RouteObject[] = [
  {
    path: "Aaa",
    Component: Aaa,
    handle: {
      label: "Aaa",
    },
  },
  {
    path: "Bbb",
    Component: Bbb,
    handle: {
      label: "Bbb",
    },
  },
  {
    path: "meeting-rooms",
    Component: MeetingRoomManage,
    handle: {
      label: "会议室管理",
    },
  },
  {
    path: "bookings",
    Component: BookingManage,
    handle: {
      label: "预约管理",
    },
  },
  {
    path: "users",
    Component: UserManage,
    handle: {
      label: "用户管理",
    },
  },
  {
    path: "statistics",
    Component: Statistics,
    handle: {
      label: "统计",
    },
  },
];

export default mainRoutes;
