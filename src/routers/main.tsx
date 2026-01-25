import Aaa from "@/views/Aaa";
import Bbb from "@/views/Bbb";
import BookingManage from "@/views/BookingManage";
import MeetingRoomManage from "@/views/MeetingRoomManage";
import Statistics from "@/views/Statistics";
import UserManage from "@/views/UserManage";

const mainRoutes = [
  {
    path: "Aaa",
    Component: Aaa,
  },
  {
    path: "Bbb",
    Component: Bbb,
  },
  {
    path: "meeting-rooms",
    Component: MeetingRoomManage,
  },
  {
    path: "bookings",
    Component: BookingManage,
  },
  {
    path: "users",
    Component: UserManage,
  },
  {
    path: "statistics",
    Component: Statistics,
  },
];

export default mainRoutes;
