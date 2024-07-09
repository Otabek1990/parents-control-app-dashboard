import React from 'react';
import ReactECharts from 'echarts-for-react';

import { useQuery } from '@tanstack/react-query';
import { PartnerDetailService } from 'services/openapi/services/PartnerDetailService';
const BarChart: React.FC = () => {

  const { data } = useQuery({
    queryKey: ['partnerStats'],
    queryFn: () => PartnerDetailService.partnerDetailList(),
  });

  console.log(data);
  const usernames = data?.map((item) => item.username);
  const profits = data?.map((item) => item.total_profit);
  console.log(usernames);
  console.log(profits);

  const option = {
    xAxis: {
      type: 'category',
      data: usernames,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: profits,
        type: 'bar',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     show: true,
    //     xAxisIndex: [0],
    //     start: 0,
    //     end: 100,
    //   },
    // ],
  };

  return <ReactECharts option={option} style={{ height: 400, width: '90%', minWidth: '100px' }} />;


};

export default BarChart;
