import { useState } from 'react';
import BarChart from './BarChart';

function ChartStats() {
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
    <div className="chart-stats-container">
      <div className="bar-chart-card">
        <div className="bar-header">
          <div className="bar-header-left">
            <span>6 Sentabr, 2023</span>

            <h3>
              4,5710mln so’m <span>+2.4%</span>
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
      <div className="pie-chart-card"></div>
    </div>
  );
}

export default ChartStats;
