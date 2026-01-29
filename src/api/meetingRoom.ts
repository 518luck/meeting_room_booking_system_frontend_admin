import axiosInstance from "@/axios";
import type {
  ApiResponse,
  MeetingRoomListParams,
  MeetingRoomListResponse,
} from "@/types/meeting-room.type";

// 会议室列表
export async function meetingRoomList(
  params: MeetingRoomListParams,
): Promise<ApiResponse<MeetingRoomListResponse>> {
  return await axiosInstance.get("/meeting-room/list", {
    params,
  });
}

// 会议室删除
export async function meetingRoomDelete(
  id: number,
): Promise<ApiResponse<boolean>> {
  return await axiosInstance.delete(`/meeting-room/${id}`);
}
