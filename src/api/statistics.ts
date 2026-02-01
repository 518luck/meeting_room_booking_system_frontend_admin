import axiosInstance from "@/axios";

// 会议室使用次数统计
export async function meetingRoomUsedCount(startTime: string, endTime: string) {
  return await axiosInstance.get("/statistic/meetingRoomUsedCount", {
    params: {
      startTime,
      endTime,
    },
  });
}

// 用户预定次数统计
export async function userBookingCount(startTime: string, endTime: string) {
  return await axiosInstance.get("/statistic/userBookingCount", {
    params: {
      startTime,
      endTime,
    },
  });
}
