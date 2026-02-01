import { useQuery } from "@tanstack/react-query";
import type { StatisticsParams } from "@/types/statistics";
import { meetingRoomUsedCount, userBookingCount } from "@/api/statistics";

// 会议室使用次数统计
export const useMeetingRoomUsedCount = (params: StatisticsParams) => {
  return useQuery({
    queryKey: ["meetingRoomUsedCount", params], // 缓存的唯一标识
    queryFn: () => meetingRoomUsedCount(params.startTime, params.endTime), // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    // select: (res) => res, // 💡 直接提取出 MeetingRoomListResponse，组件里用起来更爽
  });
};

// 用户预定次数统计
export const useUserBookingCount = (params: StatisticsParams) => {
  return useQuery({
    queryKey: ["userBookingCount", params], // 缓存的唯一标识
    queryFn: () => userBookingCount(params.startTime, params.endTime), // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    // select: (res) => res, // 💡 直接提取出 UserBookingCountParamsList，组件里用起来更爽
  });
};
