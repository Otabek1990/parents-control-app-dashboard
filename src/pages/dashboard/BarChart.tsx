import React from 'react';
import ReactECharts from 'echarts-for-react';

import { useQuery } from '@tanstack/react-query';
import { PartnerDetailService } from 'services/openapi/services/PartnerDetailService';
import { StatisticsService } from 'services/openapi';

const BarChart: React.FC = () => {
  const role = localStorage.getItem('role');
  const { data } = useQuery({
    queryKey: ['partnerStats'],
    queryFn: () => PartnerDetailService.partnerDetailList(),
  });

  const { data: partnerStatistics, isSuccess: isSuccessPartnerStatistics } = useQuery({
    queryKey: ['partnerStatisticx'],
    queryFn: () => StatisticsService.statisticsPartnerList(),
  });

  const partner = isSuccessPartnerStatistics ? partnerStatistics?.partner : '';
  const partnerProfit = isSuccessPartnerStatistics
    ? partnerStatistics?.overall_statistics?.bar_graph_data_with_profit?.parents
    : '';

  

  const partnerOption = {
    xAxis: {
      type: 'category',
      data: [partner],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [partnerProfit],
        type: 'bar',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  };
  const usernames = data?.map((item) => item.username);
  const profits = data?.map((item) => item.parent_count);
  const adminOption = {
    xAxis: {
      type: 'category',
      data: usernames,
    },
    yAxis: {
      type: 'value',
      minInterval: 1, 
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

  const opt = role === 'ADMIN' ? adminOption : partnerOption;
  return <ReactECharts option={opt} style={{ height: 400, width: role==="ADMIN" ? "90%":"40%", minWidth: '100px' }} />;
};

export default BarChart;
