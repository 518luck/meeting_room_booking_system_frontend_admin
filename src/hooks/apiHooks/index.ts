import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "@/api/login";
import type {
  CreateMeetingRoom,
  MeetingRoomListParams,
  UpdateMeetingRoom,
} from "@/types/meeting-room";
import {
  meetingRoomAdd,
  meetingRoomDelete,
  meetingRoomList,
  meetingRoomUpdate,
} from "@/api/meetingRoom";

// 获取用户信息
export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"], // 缓存的唯一标识
    queryFn: getUserInfo, // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    select: (res) => res.data, // 💡 直接提取出 UserInfo，组件里用起来更爽
  });
};

// 获取会议室列表
export const useMeetingRoomList = (params: MeetingRoomListParams) => {
  return useQuery({
    queryKey: ["meetingRoomList", params], // 缓存的唯一标识
    queryFn: () => meetingRoomList(params), // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    // select: (res) => res, // 💡 直接提取出 MeetingRoomListResponse，组件里用起来更爽
  });
};

// 删除会议
export const useMeetingRoomDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => meetingRoomDelete(id), // 执行的异步函数
    onSuccess: () => {
      // 删除成功后，手动触发会议室列表的刷新
      queryClient.invalidateQueries({ queryKey: ["meetingRoomList"] });
    },
  });
};

// 新增会议室
export const useMeetingRoomAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateMeetingRoom) => meetingRoomAdd(params), // 执行的异步函数
    onSuccess: () => {
      // 删除成功后，手动触发会议室列表的刷新
      queryClient.invalidateQueries({ queryKey: ["meetingRoomList"] });
    },
  });
};

//更新会议室
export const useMeetingRoomUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateMeetingRoom) => meetingRoomUpdate(params), // 执行的异步函数
    onSuccess: () => {
      // 删除成功后，手动触发会议室列表的刷新
      queryClient.invalidateQueries({ queryKey: ["meetingRoomList"] });
    },
  });
};
