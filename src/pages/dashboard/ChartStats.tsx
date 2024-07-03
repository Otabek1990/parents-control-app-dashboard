import BarChartCard from './BarChartCard';
import PieChartCard from './PieChartCard';

function ChartStats() {
  const role = localStorage.getItem('role');
  return (
    <div className="chart-stats-container">
      <BarChartCard />
      {role === 'ADMIN' && <PieChartCard />}
    
    </div>
  );
}

export default ChartStats;
