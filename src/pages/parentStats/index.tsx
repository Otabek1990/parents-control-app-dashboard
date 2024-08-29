import { Button, Card, Table, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';

import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { ParentDetailList, ParentDetailService } from 'services/openapi/services/ParentDetailService';
import { useState } from 'react';
import { exportDatasToExcel } from '@utils/exportExcel';
import { formatNumber } from '@utils/timeConverter';
const { Option } = Select;
interface ParentDetailListTable {
  amount: number;
  username: string;
  payment_status: string;
}

const ParentStats = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | undefined>(undefined); // Start with no filter

  const { data, isLoading } = useQuery<ParentDetailList>(
    ['parentStats', status],
    () => ParentDetailService.partnerDetailList(status),
    {
      keepPreviousData: true,
    },
  );

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
    {
      title: <span className="text-uppercase">{t('Amount')}</span>,
      key: 'amount',
      dataIndex: 'amount',
      render: (record) => {
        return formatNumber(record | 0);
      },
    },
  ];
  const exportToExcelHandler = () => {
   console.log('admin');
    exportDatasToExcel(data,'adminParents', 'Ota onalar');
  };
  return (
    <>
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <Button onClick={() => navigate(-1)}>
            <span style={{ marginRight: '5px' }}>&lt;</span> {t('Back')}
          </Button>
          <div
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            <Select defaultValue="all" style={{ width: 130 }} onChange={handleChange}>
              <Option value="all">{t('All')}</Option>
              <Option value="paid">{t('Paid')}</Option>
              <Option value="unpaid">{t('Unpaid')}</Option>
            </Select>
            <Button type="primary" onClick={exportToExcelHandler}>
              <span style={{ marginRight: '5px' }}></span> {t('Save to Excel')}
            </Button>
          </div>
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
          dataSource={data}
          loading={isLoading}
          rowKey={'username'}
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
        />
      </Card>
    </>
  );
};

export default ParentStats;
