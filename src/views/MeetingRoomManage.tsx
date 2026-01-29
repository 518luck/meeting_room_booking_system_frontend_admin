import {
  Badge,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  type TableProps,
} from "antd";
import { useCallback, useMemo, useState } from "react";
import { useMeetingRoomList, useMeetingRoomDelete } from "@/hooks/apiHooks";
import type { MeetingRoomItem } from "@/types/meeting-room.type";
const { useForm } = Form;
import { CreateMeetingRoomModal } from "@/views/components/CreateMeetingRoomModal";
import { UpdateMeetingRoomModal } from "@/views/components/UpdateMeetingRoom";

interface SearchMeetingRoom {
  name?: string;
  capacity?: number;
  equipment?: string;
}

const MeetingRoomManage = () => {
  const [pageNo, setPageNo] = useState<number>(1); // 当前页码
  const [pageSize, setPageSize] = useState<number>(10); // 每页数量
  const [searchMeetingRoomParams, setSearchMeetingRoomParams] = // 查询会议室参数
    useState<SearchMeetingRoom>({
      name: "",
      capacity: undefined,
      equipment: "",
    });
  const [createMeetingRoomModalIsOpen, setCreateMeetingRoomModalIsOpen] =
    useState<boolean>(false); // 创建会议室弹窗是否打开
  const [updateId, setUpdateId] = useState<number>(0); // 更新会议室id
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false); // 更新会议室弹窗是否打开

  // 过滤空字符串 ,null , undefined
  const filteredParams = Object.fromEntries(
    Object.entries(searchMeetingRoomParams).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );
  // 获取列表信息
  const { data: meetingRoomListData } = useMeetingRoomList({
    pageNo,
    pageSize,
    ...filteredParams,
  });
  // 解构列表信息
  let tableList;
  let tableTotal;
  if (typeof meetingRoomListData?.data !== "string") {
    tableList = meetingRoomListData?.data?.meetingRooms || [];
    tableTotal = meetingRoomListData?.data?.totalCount;
    console.log("🚀 ~ MeetingRoomManage ~ tableList:", tableList);
  }
  console.log("🚀 ~ MeetingRoomManage ~ tableTotal:", tableTotal);

  // 删除会议室
  const { mutate } = useMeetingRoomDelete();

  // 头部表格
  const columns: TableProps<MeetingRoomItem>["columns"] = useMemo(
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
          <div className="flex">
            <Popconfirm
              title="会议室删除"
              onConfirm={() => mutate(record.id)}
              description="确认删除该会议室吗？"
              okText="确认"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
            <a
              href="#"
              onClick={() => {
                setIsUpdateModalOpen(true);
                setUpdateId(record.id);
              }}
            >
              更新
            </a>
          </div>
        ),
      },
    ],
    [mutate],
  );

  // 搜索会议室
  const searchMeetingRoom = useCallback(async (values: SearchMeetingRoom) => {
    setSearchMeetingRoomParams(values);
  }, []);

  const [form] = useForm();

  // 分页
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
                onClick={() => setCreateMeetingRoomModalIsOpen(true)}
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
          dataSource={tableList}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
            total: tableTotal,
          }}
          rowKey="id"
        />
      </div>
      <CreateMeetingRoomModal
        isOpen={createMeetingRoomModalIsOpen}
        // 子组件定义类型为 ()=>void 因为这个地方的()=>setCreateMeetingRoomModalIsOpen为匿名函数,匿名函数内部执行且匿名函数也没有接收任何参数
        handleClose={() => setCreateMeetingRoomModalIsOpen(false)}
      />
      <UpdateMeetingRoomModal
        isOpen={isUpdateModalOpen}
        handleClose={() => setIsUpdateModalOpen(false)}
        updateId={updateId}
      />
    </div>
  );
};

export default MeetingRoomManage;
