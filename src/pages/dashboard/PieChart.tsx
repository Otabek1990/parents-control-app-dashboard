// PieChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { StatisticsService } from 'services/openapi';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const { data: statistics, isSuccess } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
  });
  console.log(statistics);
  const ourProfit = isSuccess
    ? statistics?.overall_stats?.total_profit -
      statistics?.overall_stats?.bar_graph_data_with_profit?.total_partner_profit
    : 0;
  const partnerProfit = isSuccess ? statistics?.overall_stats?.bar_graph_data_with_profit?.total_partner_profit : 0;
  const data: ChartData<'doughnut'> = {
    labels: ['Biz', 'Hamkor'],
    datasets: [
      {
        data: [ourProfit,partnerProfit],
        backgroundColor: ['#ffab00', '#01D25B'],
        hoverBackgroundColor: ['#FFB733', '#33FF33'],
        borderColor: ['#FFFFFF', '#FFFFFF'],
        borderWidth: 5,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem?.raw?.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', margin: '20px auto', width: '70%' }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -40%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {isSuccess && statistics?.overall_stats?.circle_graph_data}
        </div>
        <div style={{ fontSize: '16px', color: 'gray' }}>
          {isSuccess && statistics?.overall_stats?.total_amount_paid_to_partners}
        </div>
      </div>
      <div className="pie-chart-bottom">
        <div className="pie-chart-title">
          <div className="circle-div"></div>
          <span>Biz</span>
        </div>
        <div className="pie-chart-title">
          <div style={{ backgroundColor: '#01D25B' }} className="circle-div"></div>
          <span>Hamkor</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
