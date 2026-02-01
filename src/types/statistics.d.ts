// 参数
export interface StatisticsParams {
  startTime: string; // 开始时间
  endTime: string; // 结束时间
}

// 会议室使用次数统计
export interface MeetingRoomUsedCountParams {
  meetingRoomId: number; // 对应数据库 ID，建议用 number
  meetingRoomName: string; // 会议室名称
  usedCount: string; // SQL count(1) 原始结果通常是字符串
}
export type MeetingRoomUsedCountParamsList = MeetingRoomUsedCountParams[];

// 用户预定次数统计
export interface UserBookingCountParams {
  userId: number; //用户 ID
  username: string; //用户名
  bookingCount: string; //预定次数 (后端 count 返回通常为字符串)
}
export type UserBookingCountParamsList = UserBookingCountParams[];
