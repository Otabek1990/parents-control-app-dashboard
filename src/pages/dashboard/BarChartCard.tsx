import { useState } from 'react';
import BarChart from './BarChart';
import { StatisticsService } from 'services/openapi';
import { useQuery } from '@tanstack/react-query';

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

function BarChartCard() {
    const currentDate = new Date();
  const { data: statistics, isSuccess } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
  });

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
  return (
    <div className="bar-chart-card">
      <div className="bar-header">
        <div className="bar-header-left">
          <span> {formatDate(currentDate)}</span>

          <h3>
            {isSuccess && statistics?.overall_stats?.total_profit} so’m <span>0%</span>
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

      <BarChart />
    </div>
  );
}

export default BarChartCard;
