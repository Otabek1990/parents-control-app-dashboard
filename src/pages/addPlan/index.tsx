import { Card, } from 'antd';
import { useQuery } from '@tanstack/react-query';
// import { ColumnsType } from 'antd/es/table';
// import { errorHandler } from '@config/axios_config';
// import { useTranslation } from 'react-i18next';

import TitleCard from '@components/core/TitleCard';

// import { timeConverter } from '@utils/timeConverter';
// import { errorHandler } from '@config/axios_config';

import CreatePlan from './CreatePlan';
import { PlanService } from 'services/openapi/services/PlanService';
// import { PlanList } from 'services/openapi/models/PlanList';
// import Lottie from 'lottie-react';

const AddPlan = () => {
  // const { t } = useTranslation();

  const {
    data: plans,
    
    refetch,
  } = useQuery({
    queryKey: ['banner'],
    queryFn: () => PlanService.planList(),
  });
  console.log(plans);

  // const columns: ColumnsType<PlanList> = [
  //   {
  //     title: <span className="text-uppercase">id</span>,
  //     key: 'id',
  //     render: ({}, {}, index) => {
  //       return Number(index) + 1;
  //     },
  //   },
  //   {
  //     title: <span className="text-uppercase">{t('Total clients')}</span>,
  //     key: 'total_clients',
  //     dataIndex: 'total_clients',
  //   },
  //   {
  //     title: <span className="text-uppercase">{t('Total days')}</span>,
  //     key: 'total_days',
  //     dataIndex: 'total_days',
  //   },
  //   {
  //     title: <span className="text-uppercase">{t('Date')}</span>,
  //     key: 'created_at',
  //     dataIndex: 'created_at',
  //     render: (record) => {
  //       return record ? timeConverter(record) : '-';
  //     },
  //   },
  // ];

  return (
    <>
      <TitleCard titleName="Plans">
        <CreatePlan refetch={refetch} />
      </TitleCard>

      <Card>
        {/* <Table
          columns={columns}
          bordered={false}
          locale={{
            emptyText: (
              <div className="w-25 m-auto ">
                <Lottie animationData={Empty} loop={false}></Lottie>
              </div>
            ),
          }}
          dataSource={isSuccess ? plans : []}
          loading={isLoading}
          // rowKey="id"
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
        /> */}
      </Card>
    </>
  );
};

export default AddPlan;
