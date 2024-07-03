import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

const BarChart: React.FC = () => {
  const option: EChartsOption = {
    title: {
      text: 'Bar Chart Example'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Example Series',
        type: 'bar',
        data: [10, 52, 200, 334, 390],
        itemStyle: {
          color: '#73c0de'
        }
      }
    ]
  };

  return (
    <ReactECharts option={option} style={{ height: 400, width: '100%' }} />
  );
};

export default BarChart;
