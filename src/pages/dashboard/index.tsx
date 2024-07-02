import React from 'react';
import briefcase from 'assets/icons/briefcase.svg';
import user from 'assets/icons/user.svg';
import access from 'assets/icons/accessibility.svg';
// import video_cal from "assets/icons/video_call.svg";
import './styles.scss';
import { useQuery } from '@tanstack/react-query';
import { StatisticsService } from 'services/openapi';
import { PlanService } from 'services/openapi/services/PlanService';

const Dashboard: React.FC = (): JSX.Element => {
  const role = localStorage.getItem('role') || 'ADMIN';

  const {
    data: statistics,
    isSuccess,
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
  });
  console.log(isSuccess)
  const { data: plans, isSuccess: isSuccessPlans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => PlanService.planList(),
  });
  console.log(statistics);

  return (
    <div className="dashboard-wrapper">
      {/* <h1>Dashboard</h1> */}
      <div className="d-loader">
        <div className="loader-header">
          <span>{isSuccess && statistics?.overall_stats?.get_client_adding_plan?.days_progress} kun</span>
          <span>{isSuccess && statistics?.overall_stats?.get_client_adding_plan?.remaining_days} kun</span>
          <span>{isSuccess && statistics?.overall_stats?.get_client_adding_plan?.added_clients} / {isSuccessPlans && plans?.length && plans[0].total_clients}</span>
        </div>
        <div className="loader">
          <div className="active">
            <span>{isSuccess && statistics?.overall_stats?.get_client_adding_plan?.added_clients}  ta</span>
          </div>
          <div className="in-active">
            <span>{isSuccess && statistics?.overall_stats?.get_client_adding_plan?.remaining_clients}</span>
          </div>
        </div>
      </div>

      <div className="count-info row">
        {role === 'ADMIN' && (
          <div className="col-xl-6 col-xxl-3">
            <div className="count-card">
              <div className="header">
                <img src={briefcase} alt="" />
                <span>Barcha Hamkorlar</span>
              </div>
              <div className="count">13 <span>+{isSuccess && statistics?.daily_stats?.partner_growth_percentage}% </span></div>
              <div className="more">
                <div className="tag">
                  <span className="one">Olib kelgan:</span>
                  <span className="two">0&nbsp;ta</span>
                </div>
                <div className="tag">
                  <span className="one">Jami daromad:</span>
                  <span className="two"> {isSuccess && statistics?.overall_stats?.total_amount_paid_to_partners}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="col-xl-6 col-xxl-3">
          <div className="count-card">
            <div className="header">
              <img src={video_cal} alt="" />
              <span>Barcha Agentlar</span>
            </div>
            <div className="count">
              9.148
              <span>+2,4% </span>
            </div>
            <div className="more">
              <div className='tag' ><span className='one' >Jalb qilingan: </span> <span className='two' >400</span></div>
              <div className='tag' ><span className='one' >Kelishuvlar soni: </span> <span className='two' >1.704</span></div>
            </div>
          </div>
        </div> */}
        <div className="col-xl-6 col-xxl-3">
          <div className="count-card">
            <div className="header">
              <img src={user} alt="" color="#38cb89" />
              <span>Barcha Ota-Onalar</span>
            </div>
            <div className="count">
              {isSuccess && statistics?.overall_stats?.all_girls}
              <span>{isSuccess && statistics?.daily_stats?.parent_growth_percentage}% </span>
            </div>
            <div className="more">
              <div className="tag">
                <span className="one">To'landi: </span>
                <span className="two">{isSuccess && statistics?.overall_stats?.all_paid_parents} ta</span>
              </div>
              <div className="tag">
                <span className="one">To'lanmadi: </span>
                <span className="two">{isSuccess && statistics?.overall_stats?.all_unpaid_parents} ta</span>
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
              {isSuccess && statistics?.overall_stats?.all_children}
              <span>{isSuccess && statistics?.daily_stats?.child_growth_percentage}% </span>
            </div>
            <div className="more">
              <div className="tag">
                <span className="one">Bolalar: </span>
                <span className="two">{isSuccess && statistics?.overall_stats?.all_boys} ta</span>
              </div>
              <div className="tag">
                <span className="one">Qiz bolalar: </span>
                <span className="two">{isSuccess && statistics?.overall_stats?.all_girls} ta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
