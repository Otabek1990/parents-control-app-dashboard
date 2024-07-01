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
  const {
    data: statistics,

    isSuccess,
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsService.statisticsList(),
  });
  const {
    data: plans,
    isSuccess:isSuccessPlans,
  } = useQuery({
    queryKey: ['plans'],
    queryFn: () => PlanService.planList(),
  });
  console.log(plans);

  return (
    <div className="dashboard-wrapper">
      {/* <h1>Dashboard</h1> */}
      <div className="d-loader">
        <div className="loader-header">
          <span>0 kun</span>
          <span>{isSuccessPlans && plans?.length && plans[0].total_days || 365} kun</span>
          <span>0 / {isSuccessPlans && plans?.length && plans[0].total_clients }</span>
        </div>
        <div className="loader">
          <div className="active">
            <span>0 ta</span>
          </div>
          <div className="in-active">
            <span>{isSuccessPlans && plans?.length && plans[0].total_clients }</span>
          </div>
        </div>
      </div>

      <div className="count-info row">
        <div className="col-xl-6 col-xxl-3">
          <div className="count-card">
            <div className="header">
              <img src={briefcase} alt="" />
              <span>Barcha Hamkorlar</span>
            </div>
            <div className="count">0{/* <span>+2,4% </span> */}</div>
            <div className="more">
              <div className="tag">
                <span className="one">Olib kelgan:</span>
                <span className="two">0&nbsp;ta</span>
              </div>
              <div className="tag">
                <span className="one">Jami daromad:</span>
                <span className="two"> {isSuccess && statistics?.overall_statistics?.total_profit}</span>
              </div>
            </div>
          </div>
        </div>
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
              {isSuccess && statistics?.overall_statistics?.total_parents}
              <span>{isSuccess && statistics?.daily_statistics?.parent_growth}% </span>
            </div>
            <div className="more">
              <div className="tag">
                <span className="one">To'landi: </span>
                <span className="two">{isSuccess && statistics?.overall_statistics?.total_parents_paid} ta</span>
              </div>
              <div className="tag">
                <span className="one">To'lanmadi: </span>
                <span className="two">{isSuccess && statistics?.overall_statistics?.total_parents_unpaid}</span>
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
              {isSuccess && statistics?.overall_statistics?.total_children}
              <span>{isSuccess && statistics?.daily_statistics?.parent_growth}% </span>
            </div>
            <div className="more">
              <div className="tag">
                <span className="one">Bolalar: </span>
                <span className="two">{isSuccess && statistics?.overall_statistics?.total_boys} ta</span>
              </div>
              <div className="tag">
                <span className="one">Qiz bolalar: </span>
                <span className="two">{isSuccess && statistics?.overall_statistics?.total_girls} ta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
