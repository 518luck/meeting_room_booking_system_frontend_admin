import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "@/routers";
import { StyleProvider } from "@ant-design/cssinjs";
function App() {
  // 1. 创建一个客户端实例（这个实例负责管理所有缓存）
  const queryClient = new QueryClient();

  return (
    <>
      <StyleProvider layer>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StyleProvider>
    </>
  );
}

export default App;
