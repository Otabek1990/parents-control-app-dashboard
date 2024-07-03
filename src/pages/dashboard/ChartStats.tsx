// import { Tabs } from 'antd';

function ChartStats() {
//   const { TabPane } = Tabs;
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
            {/* <Tabs defaultActiveKey="1">
              <TabPane tab="Oy" key="1">
                <div>
                  <h2>Oy Content</h2>
                  <p>This is the content for the Oy tab.</p>
                </div>
              </TabPane>
              <TabPane tab="Yil" key="2">
                <div>
                  <h2>Yil Content</h2>
                  <p>This is the content for the Yil tab.</p>
                </div>
              </TabPane>
              <TabPane tab="3Yil" key="3">
                <div>
                  <h2>3Yil Content</h2>
                  <p>This is the content for the 3Yil tab.</p>
                </div>
              </TabPane>
            </Tabs> */}
          </div>
        </div>
      </div>
      <div className="pie-chart-card">
        <h1>Pie Chart</h1>
      </div>
    </div>
  );
}

export default ChartStats;
