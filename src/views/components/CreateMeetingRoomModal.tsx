import { Modal } from "antd";
import { useCallback } from "react";

interface CreateMeetingRoomModalProps {
  isOpen: boolean;
  handleClose: Function;
}

export function CreateMeetingRoomModal(props: CreateMeetingRoomModalProps) {
  const handleOk = useCallback(async function () {
    props.handleClose();
  }, []);

  return (
    <Modal
      title="创建会议室"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
    >
      <p>xxxx</p>
    </Modal>
  );
}
