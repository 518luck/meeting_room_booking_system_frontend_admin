import { Button, Form, Input } from "antd";
import { useCallback } from "react";

interface LoginUser {
  username: string;
  password: string;
}

const Login = () => {
  const onFinish = useCallback((values: LoginUser) => {
    console.log(values);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">会议室预订系统</h1>
            <p className="text-gray-500 mt-2">管理后台登录</p>
          </div>

          <Form
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <Form.Item
              label={<span className="text-gray-700 font-medium">用户名</span>}
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                placeholder="请输入用户名"
                className="rounded-lg"
                prefix={
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">密码</span>}
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                placeholder="请输入密码"
                className="rounded-lg"
                prefix={
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                }
              />
            </Form.Item>

            <Form.Item className="mb-0 mt-6">
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-12 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 border-none text-base font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                登录
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center text-sm text-gray-500">
            © 2024 会议室预订系统
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
