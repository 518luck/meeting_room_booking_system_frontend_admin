import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect } from "react";
import { LockOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { useUserInfo } from "@/hooks/apiHooks";
import { updatePasswordCaptcha, updatePassword } from "@/api/login";

export interface UpdatePassword {
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
}

const PasswordModify = () => {
  const [form] = useForm();

  const { data: userInfo, isSuccess } = useUserInfo();
  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        email: userInfo?.email,
      });
    }
  }, [isSuccess, userInfo, form]);

  const onFinish = useCallback(
    async function (values: UpdatePassword) {
      console.log("🚀 ~ PasswordModify ~ values:", values);
      await updatePassword({
        username: userInfo?.username || "",
        email: values.email,
        captcha: values.captcha,
        password: values.password,
      });
      message.success("密码修改成功");
    },
    [userInfo],
  );

  const sendCaptcha = useCallback(
    async function () {
      const email = form.getFieldValue("email");
      await updatePasswordCaptcha(email);
    },
    [form],
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">修改密码</h2>
        <p className="text-sm text-gray-500 mt-1">请输入新密码并通过邮箱验证</p>
      </div>

      <div className="bg-white rounded-lg p-8">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          colon={false}
          autoComplete="off"
          className="space-y-2"
        >
          <Form.Item
            label={<span className="text-gray-600">新密码</span>}
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              { min: 6, message: "密码至少6个字符!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="请输入新密码"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600">确认密码</span>}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请输入确认密码!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="请再次输入新密码"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600">邮箱</span>}
            name="email"
            rules={[
              { required: true, message: "请输入邮箱!" },
              { type: "email", message: "请输入合法邮箱地址!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="请输入邮箱地址"
              disabled
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600">验证码</span>}
            required
          >
            <div className="flex gap-3">
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: "请输入验证码!" }]}
              >
                <Input
                  prefix={<SafetyOutlined className="text-gray-400" />}
                  placeholder="请输入验证码"
                  className="rounded-md flex-1"
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={sendCaptcha}
                className="rounded-md"
              >
                发送验证码
              </Button>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }} className="mb-0 pt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="rounded-md px-8"
            >
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default PasswordModify;
