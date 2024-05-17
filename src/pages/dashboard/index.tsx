import React from 'react';
import briefcase from "assets/icons/briefcase.svg";
import user from "assets/icons/user.svg";
import access from "assets/icons/accessibility.svg";
import video_cal from "assets/icons/video_call.svg";
import "./styles.scss";

const Dashboard: React.FC = (): JSX.Element => {

  return (
    <div className="dashboard-wrapper">
      {/* <h1>Dashboard</h1> */}
      <div className='d-loader' >
        <div className="loader-header">
          <span>43 kun</span>
          <span>321 kun</span>
          <span>11170 / 100,000</span>
        </div>
        <div className="loader">
          <div className="active"><span>1170 ta</span></div>
          <div className='in-active' ><span>98930</span></div>
        </div>
      </div>

      <div className="count-info row">
        <div className="col-xl-6 col-xxl-3">
          <div className="count-card">
            <div className="header">
              <img src={briefcase} alt="" />
              <span>Barcha Hamkorlar</span>
            </div>
            <div className="count">
              16.120
              <span>+2,4% </span>
            </div>
            <div className="more">
              <div className='tag' ><span className='one' >Olib kelgan:</span> <span className='two' >100&nbsp;ta</span></div>
              <div className='tag' ><span className='one' >Jami daromad:</span> <span className='two' >23&nbsp;mln</span></div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-3">
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
        </div>
        <div className="col-xl-6 col-xxl-3">
          <div className="count-card">
            <div className="header">
              <img src={user} alt="" color='#38cb89' />
              <span>Barcha Ota-Onalar</span>
            </div>
            <div className="count">
              15.318
              <span>+2,4% </span>
            </div>
            <div className="more">
              <div className='tag' ><span className='one' >To'landi: </span> <span className='two' >2.150 ta</span></div>
              <div className='tag' ><span className='one' >To'lanmadi: </span> <span className='two' >340</span></div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-3">
          <div className="count-card">
            <div className="header">
              <img src={access} alt="" color='#38cb89' />
              <span>Barcha Bolalar</span>
            </div>
            <div className="count">
              29.481
              <span>+2,4% </span>
            </div>
            <div className="more">
              <div className='tag' ><span className='one' >Bolalar: </span> <span className='two' >840 ta</span></div>
              <div className='tag' ><span className='one' >Qiz bolalar: </span> <span className='two' >230 ta</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;