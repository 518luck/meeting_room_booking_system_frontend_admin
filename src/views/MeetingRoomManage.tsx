import { Badge, Button, Form, Input, Table, type TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "antd/es/form/Form";

interface SearchMeetingRoom {
  name: string;
  capacity: number;
  equipment: string;
}

interface MeetingRoomSearchResult {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
  isBooked: boolean;
  createTime: Date;
  updateTime: Date;
}

const MeetingRoomManage = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [meetingRoomResult, setMeetingRoomResult] = useState<
    Array<MeetingRoomSearchResult>
  >([]);

  // 头部表格
  const columns: TableProps<MeetingRoomSearchResult>["columns"] = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "容纳人数",
        dataIndex: "capacity",
      },
      {
        title: "位置",
        dataIndex: "location",
      },
      {
        title: "设备",
        dataIndex: "equipment",
      },
      {
        title: "描述",
        dataIndex: "description",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
      },
      {
        title: "上次更新时间",
        dataIndex: "updateTime",
      },
      {
        title: "预定状态",
        dataIndex: "isBooked",
        render: (_, record) =>
          record.isBooked ? (
            <Badge status="error">已被预订</Badge>
          ) : (
            <Badge status="success">可预定</Badge>
          ),
      },
      {
        title: "操作",
        render: (_, record) => (
          <a href="#" onClick={() => {}}>
            删除
          </a>
        ),
      },
    ],
    [],
  );

  // 搜索会议室
  const searchMeetingRoom = useCallback(
    async (values: SearchMeetingRoom) => {},
    [],
  );

  const [form] = useForm();

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 搜索表单卡片 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <Form
          form={form}
          onFinish={searchMeetingRoom}
          name="search"
          layout="inline"
          colon={false}
          className="flex flex-wrap gap-4"
        >
          <Form.Item label="会议室名称" name="name">
            <Input className="w-40" placeholder="请输入名称" />
          </Form.Item>

          <Form.Item label="容纳人数" name="capacity">
            <Input className="w-32" placeholder="请输入人数" />
          </Form.Item>

          <Form.Item label="位置" name="location">
            <Input className="w-40" placeholder="请输入位置" />
          </Form.Item>

          <Form.Item label=" ">
            <div className="flex gap-3">
              <Button type="primary" htmlType="submit">
                搜索会议室
              </Button>

              <Button
                type="primary"
                className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
              >
                添加会议室
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      {/* 表格卡片 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Table
          columns={columns}
          dataSource={meetingRoomResult}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
          }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default MeetingRoomManage;
