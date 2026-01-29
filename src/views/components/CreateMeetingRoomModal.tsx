import { Form, Input, InputNumber, Modal } from "antd";
import { useCallback } from "react";
import { useMeetingRoomAdd } from "@/hooks/apiHooks";

const { useForm } = Form;
const { TextArea } = Input;

interface CreateMeetingRoomModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function CreateMeetingRoomModal({
  isOpen,
  handleClose,
}: CreateMeetingRoomModalProps) {
  const [form] = useForm();
  const { mutateAsync: addMeetingRoom } = useMeetingRoomAdd();

  // 新增会议室
  const handleOk = useCallback(
    async function () {
      const values = form.getFieldsValue();

      try {
        await addMeetingRoom(values);
        handleClose();
      } catch (error) {
        console.error("创建会议室失败:", error);
      }
    },
    [form, handleClose, addMeetingRoom],
  );

  return (
    <Modal
      title="创建会议室"
      open={isOpen}
      onOk={handleOk}
      onCancel={() => handleClose()}
      okText={"创建"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="会议室名称"
          name="name"
          rules={[{ required: true, message: "请输入会议室名称!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="位置"
          name="location"
          rules={[{ required: true, message: "请输入会议室位置!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="容纳人数"
          name="capacity"
          rules={[{ required: true, message: "请输入会议室容量!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="设备" name="equipment">
          <Input />
        </Form.Item>

        <Form.Item label="描述" name="description">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
