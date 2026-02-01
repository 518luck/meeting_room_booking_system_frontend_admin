import { Button, DatePicker, Form, Select } from "antd";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
type EChartsOption = echarts.EChartsOption;

const Statistics = () => {
  const containerRef = useRef<HTMLDivElement>(null); // 图表容器

  // 图表初始化
  useEffect(() => {
    const myChart = echarts.init(containerRef.current);
    const option: EChartsOption = {
      //图表的名称。
      title: {
        text: "ECharts 入门示例",
      },
      // 提示框
      tooltip: {},
      // （直角坐标系轴）
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      // （系列）
      // 这是图表的灵魂，定义了你要展示的真实数据和展现形式。
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  // 查询统计数据
  function getStatisticData(values: { startTime: string; endTime: string }) {
    console.log(values);
  }

  return (
    <div id="statistics-container">
      <div className="statistics-form">
        <Form
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
    </div>
  );
};

export default Statistics;
