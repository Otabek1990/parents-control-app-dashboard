import { useState } from 'react';
import PieChart from './PieChart';

function PieChartCard() {
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
      <div style={{ justifyContent: 'flex-end' }} className="bar-header">
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
      <PieChart />
    </div>
  );
}

export default PieChartCard;
