import axiosInstance from "@/axios";
import type {
  MeetingRoomUsedCountParamsList,
  UserBookingCountParamsList,
} from "@/types/statistics";
import type { ApiResponse } from "@/types/meeting-room";

// 会议室使用次数统计
export async function meetingRoomUsedCount(
  startTime: string,
  endTime: string,
): Promise<ApiResponse<MeetingRoomUsedCountParamsList>> {
  return await axiosInstance.get("/statistic/meetingRoomUsedCount", {
    params: {
      startTime,
      endTime,
    },
  });
}

// 用户预定次数统计
export async function userBookingCount(
  startTime: string,
  endTime: string,
): Promise<ApiResponse<UserBookingCountParamsList>> {
  return await axiosInstance.get("/statistic/userBookingCount", {
    params: {
      startTime,
      endTime,
    },
  });
}
