import { Button, Card, Table, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';

import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PartnerParentStatsList, PartnerParentStatsService } from 'services/openapi/services/PartnerParentStatsService';
import { timeConverter } from '@utils/timeConverter';
const { Option } = Select;
interface ParentDetailListTable {
  abonent_code: string;
  id: number;
  last_login: string;
  status: string;
  tariff_expiry_time: string | null;
  tariff_name: string | null;
  username: string;
}

const PartnerParentStats = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | undefined>(undefined); // Start with no filter

  const { data, isLoading } = useQuery<PartnerParentStatsList>(
    ['partnerParentStats', status],
    () => PartnerParentStatsService.partnerParentDetailList(status),
    {
      keepPreviousData: true,
    },
  );
console.log(data);
  const handleChange = (value: string) => {
    if (value === 'all') {
      setStatus(undefined); // No filter for "All"
    } else {
      setStatus(value); // Set the selected status
    }
  };

  const columns: ColumnsType<ParentDetailListTable> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: ({}, {}, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: <span className="text-uppercase">{t('Username')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-uppercase">{t('Abonent code')}</span>,
      key: 'abonent_code',
      dataIndex: 'abonent_code',
    },
    {
      title: <span className="text-uppercase">{t('Tariff name')}</span>,
      key: 'tariff_name',
      dataIndex: 'tariff_name',
    },
  
    {
      title: <span className="text-uppercase">{t('Payment status')}</span>,
      key: 'status',
      dataIndex: 'status',
      render: (record) =>
        record === 'Paid' ? (
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
    {
      title: <span className="text-uppercase">{t('Tariff expire time')}</span>,
      dataIndex: 'tariff_expiry_time',
      key: 'tariff_expiry_time',
      render: (record) => (record ? timeConverter(record) : '-'),
    },
    {
      title: <span className="text-uppercase">{t('Last visit')}</span>,
      dataIndex: 'last_login',
      key: 'last_login',
      render: (record) => (record ? timeConverter(record) : ''),
    },

  ];

  return (
    <>
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <Button onClick={() => navigate(-1)}>
            <span style={{ marginRight: '5px' }}>&lt;</span> {t('Back')}
          </Button>
          <Select defaultValue="all" style={{ width: 200 }} onChange={handleChange}>
            <Option value="all">{t('All')}</Option>
            <Option value="paid">{t('Paid')}</Option>
            <Option value="unpaid">{t('Unpaid')}</Option>
          </Select>
        </div>
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
          pagination={{
            pageSize: 10,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
          dataSource={data?.results}
          loading={isLoading}
          rowKey={"username"}
         
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
        />
      </Card>
    </>
  );
};

export default PartnerParentStats;
