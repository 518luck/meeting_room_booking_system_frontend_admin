import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect } from "react";
import HeadPicUpload from "@/views/components/HeadPicUpload";
import { useUserInfo } from "@/hooks/apiHooks";
import { updateInfo, updateInfoCaptcha } from "@/api/login";

export interface UserInfo {
  username: string;
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

const InfoModify = () => {
  const [form] = useForm();

  const { data: userInfo, isSuccess } = useUserInfo();
  useEffect(() => {
    if (isSuccess) {
      form.setFieldValue("headPic", userInfo.headPic);
      form.setFieldValue("nickName", userInfo.nickName);
      form.setFieldValue("email", userInfo.email);
    }
  }, [isSuccess, form, userInfo]);

  const onFinish = useCallback(async (values: UserInfo) => {
    const res = await updateInfo(values);
    if (res.code === 200 || res.code === 201) {
      message.success("更新成功");
    }
  }, []);

  const sendCaptcha = useCallback(async function () {
    await updateInfoCaptcha();
  }, []);

  useEffect(() => {
    async function query() {}
    query();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">个人信息修改</h2>
        <p className="text-sm text-gray-500 mt-1">更新您的个人资料和头像</p>
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
            label={<span className="text-gray-600">头像</span>}
            name="headPic"
            rules={[{ required: true, message: "请上传头像!" }]}
            shouldUpdate
          >
            <HeadPicUpload />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600">昵称</span>}
            name="nickName"
            rules={[{ required: true, message: "请输入昵称!" }]}
          >
            <Input placeholder="请输入昵称" className="rounded-md" />
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
              disabled
              placeholder="邮箱地址"
              className="rounded-md bg-gray-50"
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
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default InfoModify;
