import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/login"; // 指向你刚才写的那个接口文件

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"], // 缓存的唯一标识
    queryFn: getUserInfo, // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    select: (res) => res.data, // 💡 直接提取出 UserInfo，组件里用起来更爽
  });
};
