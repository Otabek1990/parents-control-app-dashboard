import { useState } from 'react';
import { StatisticsService } from 'services/openapi';
import { useQuery } from '@tanstack/react-query';
import { StatisticsPartner } from 'services/openapi/models/Statistics';

const formatDate = (date: Date): string => {
  const months = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
// StatisticsPartner

type BarChartCardPropsPartner = {
  statisticsPartner: StatisticsPartner | undefined;
};

function BarChartCard({ statisticsPartner }: BarChartCardPropsPartner) {
  // const [partnerStatistics, setStatisticsPartner] = useState<StatisticsPartner>();
  const currentDate = new Date();
  const role = localStorage.getItem('role');
  const { data: statistics } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
    enabled: role==="ADMIN", // The query will only run if isAdmin() returns true
    onError: (error) => {
      console.error('Failed to fetch statistics:', error);
    },
  });

  // queryKey: ['statistics'],
  // queryFn: () => StatisticsService.statisticsList(),

  const [currentId, setCurrentId] = useState<number>(1);
  const tabBtns = [
    {
      title: 'Oy',
      id: 1,
    },
    {
      title: 'Yil',
      id: 2,
    },
    {
      title: '3 Yil',
      id: 3,
    },
  ];
  const totalProfit =
    role === 'ADMIN' ? statistics?.overall_stats?.total_profit : statisticsPartner?.overall_statistics?.total_profit;
  const perGrowth =
    role === 'ADMIN'
      ? statistics?.daily_stats?.partner_growth_percentage
      : statisticsPartner?.daily_statistics?.parent_growth;

  return (
    <div className="bar-header">
      <div className="bar-header-left">
        <span> -{formatDate(currentDate)}</span>

        <h3>
          {totalProfit} so’m <span>{perGrowth}%</span>
        </h3>
      </div>
      <div className="bar-header-right">
        {tabBtns.map((btn) => (
          <button
            onClick={() => setCurrentId(btn.id)}
            style={{ backgroundColor: currentId === btn.id ? 'white' : 'transparent' }}
            key={btn.id}
          >
            {btn.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BarChartCard;
