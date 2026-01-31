import axiosInstance from "@/axios";
import type {
  ApiResponse,
  MeetingRoomListParams,
  MeetingRoomListResponse,
  CreateMeetingRoom,
  MeetingRoomItem,
  UpdateMeetingRoom,
} from "@/types/meeting-room";

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

//新增会议室
export async function meetingRoomAdd(
  params: CreateMeetingRoom,
): Promise<ApiResponse<boolean>> {
  return await axiosInstance.post("/meeting-room/create", params);
}

//会议室回显接口
export async function meetingRoomDetail(
  id: number,
): Promise<ApiResponse<MeetingRoomItem>> {
  return await axiosInstance.get(`/meeting-room/${id}`);
}

//更新会议室
export async function meetingRoomUpdate(
  params: UpdateMeetingRoom,
): Promise<ApiResponse<boolean>> {
  return await axiosInstance.put(`/meeting-room/update`, params);
}
