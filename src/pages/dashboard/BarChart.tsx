import ReactECharts from 'echarts-for-react';

import { useQuery } from '@tanstack/react-query';
import { PartnerDetailService } from 'services/openapi/services/PartnerDetailService';
import { StatisticsPartner } from 'services/openapi/models/Statistics';

type BarChartCardPropsPartner = {
  statisticsPartner: StatisticsPartner | undefined;
};

function BarChart({ statisticsPartner }: BarChartCardPropsPartner) {
  const role = localStorage.getItem('role');
  const { data } = useQuery({
    queryKey: ['partnerStats'],
    queryFn: () => PartnerDetailService.partnerDetailList(),
    enabled: role==="ADMIN", // The query will only run if isAdmin() returns true
    onError: (error) => {
      console.error('Failed to fetch statistics:', error);
    },
  });

  const partner = statisticsPartner?.partner;
  const partnerProfit = statisticsPartner?.overall_statistics?.bar_graph_data_with_profit?.parents;

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

  };

  const opt = role === 'ADMIN' ? adminOption : partnerOption;
  return (
    <ReactECharts option={opt} style={{ height: 400, width: role === 'ADMIN' ? '90%' : '40%', minWidth: '100px' }} />
  );
}

export default BarChart;
