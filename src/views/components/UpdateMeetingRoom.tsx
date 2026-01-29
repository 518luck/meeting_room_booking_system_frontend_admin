import { Form, Input, InputNumber, Modal } from "antd";
import { useCallback, useEffect } from "react";
import { useMeetingRoomUpdate } from "@/hooks/apiHooks";
import { meetingRoomDetail } from "@/api/meetingRoom";

const { useForm } = Form;
const { TextArea } = Input;

interface CreateMeetingRoomModalProps {
  isOpen: boolean;
  handleClose: () => void;
  updateId: number;
}

export function UpdateMeetingRoomModal({
  isOpen,
  handleClose,
  updateId,
}: CreateMeetingRoomModalProps) {
  const [form] = useForm();
  const { mutateAsync: updateMeetingRoom } = useMeetingRoomUpdate();

  // 回显数据
  useEffect(() => {
    (async () => {
      const res = await meetingRoomDetail(updateId);
      console.log("🚀 ~ UpdateMeetingRoomModal ~ res:", res);
      form.setFieldsValue(res.data);
    })();
  }, [isOpen, updateId, form]);

  // 新增会议室
  const handleOk = useCallback(
    async function () {
      const values = form.getFieldsValue();

      try {
        await updateMeetingRoom({ ...values, id: updateId });
        handleClose();
      } catch (error) {
        console.error("更新会议室失败:", error);
      }
    },
    [form, handleClose, updateMeetingRoom, updateId],
  );

  return (
    <Modal
      title={
        <span className="text-lg font-semibold text-gray-800">创建会议室</span>
      }
      open={isOpen}
      onOk={handleOk}
      onCancel={() => handleClose()}
      okText={"更新"}
      width={520}
      className="[&_.ant-modal-content]:rounded-xl [&_.ant-modal-content]:shadow-2xl [&_.ant-modal-header]:border-b [&_.ant-modal-header]:border-gray-100 [&_.ant-modal-header]:pb-4 [&_.ant-modal-footer]:border-t [&_.ant-modal-footer]:border-gray-100 [&_.ant-modal-footer]:pt-4"
      okButtonProps={{
        className:
          "bg-blue-500 hover:bg-blue-600 border-none rounded-lg px-6 h-9",
      }}
      cancelButtonProps={{
        className: "border-gray-300 hover:border-gray-400 rounded-lg px-6 h-9",
      }}
    >
      <Form
        form={form}
        colon={false}
        layout="vertical"
        className="pt-4 space-y-1"
      >
        <Form.Item
          label={<span className="text-gray-700 font-medium">会议室名称</span>}
          name="name"
          rules={[{ required: true, message: "请输入会议室名称!" }]}
          className="mb-4"
        >
          <Input
            placeholder="请输入会议室名称"
            className="h-10 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 font-medium">位置</span>}
          name="location"
          rules={[{ required: true, message: "请输入会议室位置!" }]}
          className="mb-4"
        >
          <Input
            placeholder="请输入会议室位置"
            className="h-10 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 font-medium">容纳人数</span>}
          name="capacity"
          rules={[{ required: true, message: "请输入会议室容量!" }]}
          className="mb-4"
        >
          <InputNumber
            placeholder="请输入容纳人数"
            min={1}
            className="w-full h-10 rounded-lg [&_.ant-input-number-input]:h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 font-medium">设备</span>}
          name="equipment"
          className="mb-4"
        >
          <Input
            placeholder="请输入设备信息，如：投影仪、白板等"
            className="h-10 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 font-medium">描述</span>}
          name="description"
          className="mb-0"
        >
          <TextArea
            placeholder="请输入会议室描述"
            rows={3}
            className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 resize-none"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
