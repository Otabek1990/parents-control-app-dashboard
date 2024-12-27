import React, { useEffect, useState } from 'react';
import briefcase from 'assets/icons/briefcase.svg';
import user from 'assets/icons/user.svg';
import access from 'assets/icons/accessibility.svg';
// import video_cal from "assets/icons/video_call.svg";
import './styles.scss';
import { useQuery } from '@tanstack/react-query';
import { StatisticsService } from 'services/openapi';
import { PlanService } from 'services/openapi/services/PlanService';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ACCESS_TOKEN, API_URL } from '@config/constants';
import { StatisticsPartner } from 'services/openapi/models/Statistics';
import BarChartCard from './BarChartCard';
import PieChartCard from './PieChartCard';
import BarChart from './BarChart';

const Dashboard: React.FC = (): JSX.Element => {
  const [isSuccessStatPartner, setIsSuccessStatPartner] = useState(false);
  const [statisticsPartner, setStatisticsPartner] = useState<StatisticsPartner>();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const role = localStorage.getItem('role') || 'ADMIN';
  const navigate = useNavigate();

  const { data: statistics, isSuccess } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
    enabled: role==="ADMIN", // The query will only run if isAdmin() returns true
    onError: (error) => {
      console.error('Failed to fetch statistics:', error);
    },
  });
  // const { data: statisticsPartner, isSuccess: isSuccessStatPartner } = useQuery({
  //   queryKey: ['statisticsOfPartner'],
  //   queryFn: () => StatisticsService.statisticsPartnerList(),
  // });
  // console.log(statisticsPartner);

  const { data: plans, isSuccess: isSuccessPlans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => PlanService.planList(),
    enabled: role==="ADMIN", // The query will only run if isAdmin() returns true
    onError: (error) => {
      console.error('Failed to fetch statistics:', error);
    },
  });

  useEffect(() => {
    async function FetchData() {
      try {
        const res = await axios.get(`${API_URL}/v1/admin-panel-statistics/partner/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatisticsPartner(res?.data);
        setIsSuccessStatPartner(true);
      } catch (err) {
        console.log(err);
        setIsSuccessStatPartner(false);
      }
    }
    FetchData();
  }, []);
  

  return (
    <div className="dashboard-wrapper">
      {/* <h1>Dashboard</h1> */}
      {/* {role === 'ADMIN' && ( */}
      <div className="d-loader">
        <div className="loader-header">
          <span>
            {(isSuccess && statistics?.overall_stats?.get_client_adding_plan?.days_progress) ||
              (isSuccessStatPartner &&
                statisticsPartner?.overall_statistics?.partner_cleint_adding_plan?.days_progress)}{' '}
            kun
          </span>
          <span>
            {(isSuccess && statistics?.overall_stats?.get_client_adding_plan?.remaining_days) ||
              (isSuccessStatPartner &&
                statisticsPartner?.overall_statistics?.partner_cleint_adding_plan?.remaining_days)}{' '}
            kun
          </span>
          <span>
            {(isSuccess && statistics?.overall_stats?.get_client_adding_plan?.added_clients) ||
              (isSuccessStatPartner &&
                statisticsPartner?.overall_statistics?.partner_cleint_adding_plan?.added_clients)}{' '}
            / {(isSuccessPlans && plans?.length && plans[0].total_clients) || 5000}
          </span>
        </div>
        <div className="loader">
          <div className="active">
            <span>
              {(isSuccess && statistics?.overall_stats?.get_client_adding_plan?.added_clients) ||
                (isSuccessStatPartner &&
                  statisticsPartner?.overall_statistics?.partner_cleint_adding_plan?.added_clients)}{' '}
              ta
            </span>
          </div>
          <div className="in-active">
            <span>
              {(isSuccess && statistics?.overall_stats?.get_client_adding_plan?.remaining_clients) ||
                (isSuccessStatPartner &&
                  statisticsPartner?.overall_statistics?.partner_cleint_adding_plan?.remaining_clients)}
            </span>
          </div>
        </div>
      </div>
      {/* )} */}

      <div className="count-info row">
        {role === 'ADMIN' && (
          <div className="col-xl-6 col-xxl-3">
            <div onClick={() => navigate('/partnerStats')} className="count-card">
              <div className="header">
                <img src={briefcase} alt="" />
                <span>Barcha Hamkorlar</span>
              </div>
              <div className="count">
                {isSuccess && statistics?.overall_stats?.bar_graph_data_with_profit?.partners}
                <span>+{isSuccess && statistics?.daily_stats?.partner_growth_percentage} % </span>
              </div>
              <div className="more">
                <div className="tag">
                  <span className="one">Olib kelgan:</span>
                  <span className="two">{isSuccess && statistics?.daily_stats?.daily_joined_parents}&nbsp;ta</span>
                </div>
                <div className="tag">
                  <span className="one">Jami foyda:</span>
                  <span className="two">
                    {' '}
                    {isSuccess && statistics?.overall_stats?.bar_graph_data_with_profit?.total_partner_profit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-xl-6 col-xxl-3">
          <div
            onClick={() => (role === 'ADMIN' ? navigate('/parentStats') : navigate('/partnerParentStats'))}
            className="count-card"
          >
            <div className="header">
              <img src={user} alt="" color="#38cb89" />
              <span>Barcha Ota-Onalar</span>
            </div>
            <div className="count">
              {(isSuccess && statistics?.overall_stats?.bar_graph_data_with_profit?.parents) ||
                (isSuccessStatPartner && statisticsPartner?.overall_statistics?.total_parents)}
              <span>
                {(isSuccess && statistics?.daily_stats?.parent_growth_percentage) ||
                  (isSuccessStatPartner && statisticsPartner?.daily_statistics?.parent_growth)}
                %{' '}
              </span>
            </div>
            <div className="more">
              <div className="tag">
                <span className="one">To'landi: </span>
                <span className="two">
                  {(isSuccess && statistics?.overall_stats?.all_paid_parents) ||
                    (isSuccessStatPartner && statisticsPartner?.overall_statistics?.total_parents_paid)}{' '}
                  ta
                </span>
              </div>
              <div className="tag">
                <span className="one">To'lanmadi: </span>
                <span className="two">
                  {(isSuccess && statistics?.overall_stats?.all_unpaid_parents) ||
                    (isSuccessStatPartner && statisticsPartner?.overall_statistics?.total_parents_unpaid)}{' '}
                  ta
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-3">
          <div className="count-card">
            <div className="header">
              <img src={access} alt="" color="#38cb89" />
              <span>Barcha Bolalar</span>
            </div>
            <div className="count">
              {(isSuccess && statistics?.overall_stats?.all_children) ||
                (isSuccessStatPartner && statisticsPartner?.overall_statistics?.total_children)}
              <span>
                {(isSuccess && statistics?.daily_stats?.child_growth_percentage) ||
                  (isSuccessStatPartner && statisticsPartner?.daily_statistics?.child_growth)}
                %{' '}
              </span>
            </div>
            <div className="more">
              <div className="tag">
                <span className="one">O'gil bolalar: </span>
                <span className="two">
                  {(isSuccess && statistics?.overall_stats?.all_boys) ||
                    (isSuccessStatPartner && statisticsPartner?.overall_statistics?.total_boys)}{' '}
                  ta
                </span>
              </div>
              <div className="tag">
                <span className="one">Qiz bolalar: </span>
                <span className="two">
                  {(isSuccess && statistics?.overall_stats?.all_girls) ||
                    (isSuccessStatPartner && statisticsPartner?.overall_statistics?.total_girls)}{' '}
                  ta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-stats-container">
        <div className="bar-chart-card">
         <BarChartCard statisticsPartner={statisticsPartner}/> 
          <BarChart statisticsPartner={statisticsPartner} />
        </div>
        {role === 'ADMIN'  && <PieChartCard />}
      </div>
    </div>
  );
};

export default Dashboard;
