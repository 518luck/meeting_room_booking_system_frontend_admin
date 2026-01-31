import { useQuery } from "@tanstack/react-query";
import type { SearchBookingParams } from "@/types/booking";
import { bookingList } from "@/api/booking";

// 获取预约列表
export const useBookingList = (params: SearchBookingParams) => {
  const filteredSearchBookingParams = Object.fromEntries(
    Object.entries(params.searchBooking).filter(
      ([_, value]) => value !== undefined,
    ),
  );
  const filteredParams = {
    ...params,
    searchBooking: filteredSearchBookingParams,
  };
  return useQuery({
    queryKey: ["bookingList", filteredParams], // 缓存的唯一标识
    queryFn: () => bookingList(filteredParams), // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    // select: (res) => res, // 💡 直接提取出 MeetingRoomListResponse，组件里用起来更爽
  });
};
