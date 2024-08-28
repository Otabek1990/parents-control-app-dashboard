import { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { StatisticsService } from 'services/openapi';
import { useQuery } from '@tanstack/react-query';
import { StatisticsPartner } from 'services/openapi/models/Statistics';
import { ACCESS_TOKEN, API_URL } from '@config/constants';
import axios from 'axios';

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
 
  const token = localStorage.getItem(ACCESS_TOKEN);
  const [partnerStatistics, setStatisticsPartner] = useState<StatisticsPartner>();
  const currentDate = new Date();
  const role = localStorage.getItem('role');
  const { data: statistics } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
  });
  // const { data: partnerStatistics} = useQuery({
  //   queryKey: ['partnerStatistic'],
  //   queryFn: () => StatisticsService.statisticsPartnerList(),
  // });

  useEffect(() => {
    async function FetchData() {
      try {
        const res = await axios.get(`${API_URL}/v1/admin-panel-statistics/partner/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatisticsPartner(res?.data);
       
      } catch (err) {
        console.log(err);
       
      }
    }
    FetchData()
  }, []);
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
    role === 'ADMIN' ? statistics?.overall_stats?.total_profit : partnerStatistics?.overall_statistics?.total_profit;
  const perGrowth =
    role === 'ADMIN'
      ? statistics?.daily_stats?.partner_growth_percentage
      : partnerStatistics?.daily_statistics?.parent_growth;



  return (
    <div className="bar-chart-card">
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

      <BarChart />
    </div>
  );
}

export default BarChartCard;
