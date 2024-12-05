import { Button, Card, Table, Select, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { ParentDetailService } from 'services/openapi/services/ParentDetailService';
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
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Query
  const { data, isLoading, isFetching, isSuccess } = useQuery(
    ['parentStats', status, pageSize, currentPage],
    () => {
      const offset = (currentPage - 1) * pageSize; // Offsetni faqat shu yerda hisoblang
      return ParentDetailService.partnerDetailList(status, pageSize, offset);
    },
    {
      keepPreviousData: true,
    },
  );

  const handleStatusChange = (value: string) => {
    setStatus(value === 'all' ? undefined : value);
    setCurrentPage(1); // Filter o'zgarganda sahifani qayta boshlash
  };

  const columns: ColumnsType<ParentDetailListTable> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
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
      render: (record) => formatNumber(record || 0),
    },
  ];

  const exportToExcelHandler = () => {
    if (data?.results) {
      const offset = (currentPage - 1) * pageSize;
      const exportData = data.results.map((item, index) => ({
        id: offset + index + 1,
        username: item.username,
        payment_status: item.payment_status,
        amount: item.amount,
      }));
      exportDatasToExcel(exportData, 'adminParents', 'Ota-onalar');
    }
  };

  return (
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
        <div style={{ display: 'flex', gap: '20px' }}>
          <Select defaultValue="all" style={{ width: 130 }} onChange={handleStatusChange}>
            <Option value="all">{t('All')}</Option>
            <Option value="paid">{t('Paid')}</Option>
            <Option value="unpaid">{t('Unpaid')}</Option>
          </Select>
          <Button type="primary" onClick={exportToExcelHandler}>
            {t('Save to Excel')}
          </Button>
        </div>
      </div>
      {isFetching ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          bordered={false}
          locale={{
            emptyText: (
              <div className="w-25 m-auto ">
                <Lottie animationData={Empty} loop={false} />
              </div>
            ),
          }}
          pagination={{
            pageSize,
            pageSizeOptions: ['10', '25', '50', '100'],
            showSizeChanger: true,
            onShowSizeChange: (_, newSize) => setPageSize(newSize),
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            total: data?.count || 0,
          }}
          dataSource={isSuccess ? data?.results : []}
          loading={isLoading}
          rowKey={'username'}
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
        />
      )}
    </Card>
  );
};

export default ParentStats;

