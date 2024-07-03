import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { StatisticsService } from 'services/openapi';
import { useQuery } from '@tanstack/react-query';
const BarChart: React.FC = () => {
  const { data: statistics } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
  });

  const option: EChartsOption = {
    // title: {
    //   text: 'Bar Chart Example'
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Hamkorlar', 'Ota-onalar', 'Bolalar'],
    },
    yAxis: {
      type: 'value',
    },

    series: [
      {
        name: 'Jami',
        type: 'bar',
        data: [
          statistics?.overall_stats?.bar_graph_data_with_profit?.partners,
          statistics?.overall_stats?.bar_graph_data_with_profit?.parents,
          statistics?.overall_stats?.all_children,
        ],
        itemStyle: {
          color: '#DFE2E7',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400, width: '70%', minWidth: '400px' }} />;
};

export default BarChart;
