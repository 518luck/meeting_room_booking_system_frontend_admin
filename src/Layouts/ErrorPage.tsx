import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Result
        status="404" // 或者 "500", "403", "error"
        title="404"
        subTitle="抱歉，您访问的页面不存在或权限已过期。"
        extra={
          <div className="flex flex-col items-center gap-4">
            <Button
              type="primary"
              size="large"
              className="bg-blue-600"
              onClick={() => navigate("/auth/login")}
            >
              返回登录界面
            </Button>
            <Button type="link" onClick={() => navigate(-1)}>
              返回上一页
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default ErrorPage;
