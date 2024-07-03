import { Button, Card, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';

import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { ParentDetailList, ParentDetailService } from 'services/openapi/services/ParentDetailService';

const ParentStats = () => {
  const { t } = useTranslation();
  const navigate=useNavigate()

  const { data, isLoading} = useQuery({
    queryKey: ['parentStats'],
    queryFn: () => ParentDetailService.partnerDetailList(),
  });
  console.log(data);

  const columns: ColumnsType<ParentDetailList> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: ({}, {}, index: number) => {
        return Number(index) + 1;
      },
    },
    {
      title: <span className="text-uppercase">{t('Username')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-uppercase">{t('Payment status')}</span>,
      key: 'payment_status',
      dataIndex: 'payment_status',
      render: (record) =>
        record==="Paid" ? (
          <Button
            style={{
              backgroundColor: '#00E67F',
              color: 'white',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {t('Paid')}
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: '#F63409',
              color: 'white',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {t('Unpaid')}
          </Button>
        ),

    },
  
  ];

  return (
    <>
      <Card>
        <Button onClick={()=>navigate(-1)}>
         <span style={{marginRight:"5px"}}>&lt;</span> {t("Back")}
        </Button>
        <Table
          columns={columns}
          bordered={false}
          locale={{
            emptyText: (
              <div className="w-25 m-auto ">
                <Lottie animationData={Empty} loop={false}></Lottie>
              </div>
            ),
          }}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
        />
      </Card>
    </>
  );
};

export default ParentStats;
