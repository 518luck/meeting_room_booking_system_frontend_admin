import {
  useMeetingRoomUsedCount,
  useUserBookingCount,
} from "@/hooks/apiHooks/statistics";
import { Button, DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
type EChartsOption = echarts.EChartsOption;

const { useForm, useWatch } = Form;

const Statistics = () => {
  const [form] = useForm(); // 表单实例
  const containerRef = useRef<HTMLDivElement>(null); // 图表容器
  const containerRef2 = useRef<HTMLDivElement>(null); // 图表容器2
  const [queryRange, setQueryRange] = useState({
    startTime: "2024-01-01",
    endTime: "2027-01-07",
  }); // 查询范围参数

  // 会议室使用次数统计
  const { data: meetingRoomUsed } = useMeetingRoomUsedCount(queryRange);
  const meetingRoomUsedCountData = meetingRoomUsed?.data;

  // 图表类型
  const chartType = useWatch("chartType", form);

  // 预约次数统计
  const { data: booking } = useUserBookingCount(queryRange);
  const bookingCountData = booking?.data;

  // 图表初始化预约次数统计
  useEffect(() => {
    if (
      !containerRef.current ||
      !bookingCountData ||
      typeof bookingCountData === "string"
    )
      return;

    const myChart = echarts.init(containerRef.current);

    const isPie = chartType === "pie";

    const option: EChartsOption = {
      //图表的名称。
      title: {
        text: "用户预定情况",
      },
      // 提示框
      tooltip: {},
      // （直角坐标系轴）
      xAxis: isPie
        ? undefined
        : {
            type: "category",
            data: bookingCountData?.map((item) => item.username),
          },
      yAxis: isPie ? undefined : { type: "value" },
      // （系列）
      // 这是图表的灵魂，定义了你要展示的真实数据和展现形式。
      series: [
        {
          name: "预定次数",
          type: chartType,
          radius: isPie ? "50%" : undefined,
          data:
            typeof bookingCountData === "string"
              ? []
              : bookingCountData?.map((item) => {
                  return {
                    name: item.username,
                    value: item.bookingCount,
                  };
                }),
        },
      ],
    };

    myChart.setOption(option);
  }, [bookingCountData, form, chartType]);

  // 图表初始化会议室数统计
  useEffect(() => {
    if (
      !containerRef2.current ||
      !meetingRoomUsedCountData ||
      typeof meetingRoomUsedCountData === "string"
    )
      return;

    const myChart = echarts.init(containerRef2.current);

    const isPie = chartType === "pie";

    const option: EChartsOption = {
      //图表的名称。
      title: {
        text: "会议室使用次数统计",
      },
      // 提示框
      tooltip: {},
      // （直角坐标系轴）
      xAxis: isPie
        ? undefined
        : {
            type: "category",
            data: meetingRoomUsedCountData?.map((item) => item.meetingRoomName),
          },
      yAxis: isPie ? undefined : { type: "value" },
      // （系列）
      // 这是图表的灵魂，定义了你要展示的真实数据和展现形式。
      series: [
        {
          name: "预定次数",
          type: chartType,
          radius: isPie ? "50%" : undefined,
          data:
            typeof meetingRoomUsedCountData === "string"
              ? []
              : meetingRoomUsedCountData?.map((item) => {
                  return {
                    name: item.meetingRoomName,
                    value: item.usedCount,
                  };
                }),
        },
      ],
    };

    myChart.setOption(option);
  }, [meetingRoomUsedCountData, form, chartType]);

  // 查询统计数据
  function getStatisticData(values: { startTime: string; endTime: string }) {
    const startTime = dayjs(values.startTime).format("YYYY-MM-DD");
    const endTime = dayjs(values.endTime).format("YYYY-MM-DD");
    setQueryRange({ startTime, endTime });
  }

  return (
    <div id="statistics-container">
      <div className="statistics-form">
        <Form
          form={form}
          onFinish={getStatisticData}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="开始日期" name="startTime">
            <DatePicker />
          </Form.Item>

          <Form.Item label="结束日期" name="endTime">
            <DatePicker />
          </Form.Item>

          <Form.Item label="图表类型" name="chartType" initialValue={"bar"}>
            <Select>
              <Select.Option value="pie">饼图</Select.Option>

              <Select.Option value="bar">柱形图</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* 在react当中不需要赋值给.current 只需要在js使用的时候调用current */}
      <div className="w-[800px] h-[600px]" ref={containerRef}>
        图表
      </div>
      <div className="w-[800px] h-[600px]" ref={containerRef2}>
        图表
      </div>
    </div>
  );
};

export default Statistics;
