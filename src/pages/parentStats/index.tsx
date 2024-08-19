import { Button, Card, Table, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';

import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { ParentDetailList, ParentDetailService } from 'services/openapi/services/ParentDetailService';
import { useState } from 'react';
const { Option } = Select;
const ParentStats = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'ADMIN';
  // const role: string = useAuthStore((s: any) => s.role);

  // const { data, isLoading } = useQuery({
  //   queryKey: ['parentStats'],
  //   queryFn: () => ParentDetailService.partnerDetailList(),
  // });
  const [status, setStatus] = useState<string | undefined>(undefined); // Start with no filter

  // Use React Query to fetch data with the selected status
  const { data, isLoading } = useQuery<ParentDetailList>(
    ['parentStats', status], // Pass status as part of the query key to refetch on status change
    () => ParentDetailService.partnerDetailList(status), // Pass status to API call
    { keepPreviousData: true }, // Optional: keeps the previous data while refetching
  );

  const handleChange = (value: string) => {
    if (value === 'all') {
      setStatus(undefined); // No filter for "All"
    } else {
      setStatus(value); // Set the selected status
    }
  };
  // Define the dropdown menu items

  const columns: ColumnsType<ParentDetailList> = [
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
      title: <span className="text-uppercase">{t('Payment status')}</span>,
      key: 'payment_status',
      dataIndex: 'payment_status',
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
          dataSource={role === 'ADMIN' ? data : data?.results}
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
