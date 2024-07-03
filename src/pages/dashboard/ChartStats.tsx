import BarChartCard from './BarChartCard';
import PieChartCard from './PieChartCard';

function ChartStats() {
  return (
    <div className="chart-stats-container">
      <BarChartCard />

      <PieChartCard />
    </div>
  );
}

export default ChartStats;
