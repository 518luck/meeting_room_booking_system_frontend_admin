import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Table,
  TimePicker,
  type TableProps,
} from "antd";
import { useState } from "react";
import type { UserItem } from "@/api/login";
import type { MeetingRoomItem } from "@/types/meeting-room";
import dayjs from "dayjs";
import type { SearchBooking } from "@/types/booking";
import {
  useBookingList,
  useApplyBooking,
  useRejectBooking,
  useUnbindBooking,
} from "@/hooks/apiHooks/booking";

const { useForm } = Form;

interface BookingSearchResult {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
  createTime: string;
  updateTime: string;
  user: UserItem;
  room: MeetingRoomItem;
}

const BookingManage = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchParams, setSearchParams] = useState<SearchBooking>({}); // 搜索参数

  const columns: TableProps<BookingSearchResult>["columns"] = [
    {
      title: "会议室名称",
      dataIndex: "room",
      render(_, record) {
        return record.room.name;
      },
    },
    {
      title: "会议室位置",
      dataIndex: "room",
      render(_, record) {
        return record.room.location;
      },
    },
    {
      title: "预定人",
      dataIndex: "user",
      render(_, record) {
        return record.user.username;
      },
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      render(_, record) {
        return dayjs(new Date(record.startTime)).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      render(_, record) {
        return dayjs(new Date(record.endTime)).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "审批状态",
      dataIndex: "status",
      onFilter: (value, record) => record.status.startsWith(value as string),
      filters: [
        {
          text: "审批通过",
          value: "审批通过",
        },
        {
          text: "审批驳回",
          value: "审批驳回",
        },
        {
          text: "申请中",
          value: "申请中",
        },
        {
          text: "已解除",
          value: "已解除",
        },
      ],
    },
    {
      title: "预定时间",
      dataIndex: "createTime",
      render(_, record) {
        return dayjs(new Date(record.createTime)).format("YYYY-MM-DD hh:mm:ss");
      },
    },
    {
      title: "备注",
      dataIndex: "note",
    },
    {
      title: "描述",
      dataIndex: "description",
    },
    {
      title: "操作",
      render: (_, record) => (
        <div>
          <Popconfirm
            title="通过申请"
            description="确认通过吗？"
            onConfirm={() => changeStatus(record.id, "apply")}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">通过</a>
          </Popconfirm>

          <br />
          <Popconfirm
            title="驳回申请"
            description="确认驳回吗？"
            onConfirm={() => changeStatus(record.id, "reject")}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">驳回</a>
          </Popconfirm>

          <br />
          <Popconfirm
            title="解除申请"
            description="确认解除吗？"
            onConfirm={() => changeStatus(record.id, "unbind")}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">解除</a>
          </Popconfirm>

          <br />
        </div>
      ),
    },
  ];

  // 列表接口
  const { data: bookingListDataObject } = useBookingList({
    searchBooking: searchParams,
    pageNo,
    pageSize,
  });
  // 从列表接口提取数据数组和总记录数
  const bookingListDataArray = bookingListDataObject?.data?.bookings || [];
  const totalCount = bookingListDataObject?.data?.totalCount || 0;

  // 预约申请
  const { mutate: applyBooking } = useApplyBooking();
  // 预约拒绝
  const { mutate: rejectBooking } = useRejectBooking();
  // 已解除预约
  const { mutate: unbindBooking } = useUnbindBooking();

  // 改变预约状态
  const changeStatus = (id: number, status: string) => {
    if (status === "apply") {
      applyBooking(id);
    } else if (status === "reject") {
      rejectBooking(id);
    } else if (status === "unbind") {
      unbindBooking(id);
    }
  };

  // 搜索预约
  const searchBooking = async (values: SearchBooking) => {
    console.log("🚀 ~ searchBooking ~ values:", values);
    setSearchParams(values);
  };

  const [form] = useForm();

  // 改变分页
  const changePage = function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  };

  return (
    <div id="bookingManage-container">
      <div className="bookingManage-form">
        <Form
          form={form}
          onFinish={searchBooking}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="预定人" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="会议室名称" name="meetingRoomName">
            <Input />
          </Form.Item>

          <Form.Item label="预定开始日期" name="rangeStartDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="预定开始时间" name="rangeStartTime">
            <TimePicker />
          </Form.Item>

          <Form.Item label="预定结束日期" name="rangeEndDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="预定结束时间" name="rangeEndTime">
            <TimePicker />
          </Form.Item>

          <Form.Item label="位置" name="meetingRoomPosition">
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索预定申请
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="bookingManage-table">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={bookingListDataArray}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
            total: totalCount,
          }}
        />
      </div>
    </div>
  );
};

export default BookingManage;
