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
import { exportDatasToExcel } from '@utils/exportExcel';

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | undefined>(undefined); // Filter
  const [currentPage, setCurrentPage] = useState(1); // Pagination control
  const [pageSize, setPageSize] = useState(10); // Items per page

  const { data, isLoading, isError } = useQuery(
    ['partnerParentStats', status, currentPage, pageSize], // Add pageSize as dependency
    () => PartnerParentStatsService.partnerParentDetailList(status, pageSize, (currentPage - 1) * pageSize),
    {
      keepPreviousData: true, // Keep previous data while fetching
    },
  );

  const handleStatusChange = (value: string) => {
    setCurrentPage(1); // Return to the first page
    setStatus(value === 'all' ? undefined : value); // Update status
  };

  // const handlePageSizeChange = (value: number) => {
  //   console.log(value);
  //   setCurrentPage(1); // Reset to first page when page size changes
  //   setPageSize(value); // Update page size
  // };

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
        record?.status === 'Paid' ? (
          <Button style={{ backgroundColor: '#00E67F', color: 'white' }}>{t('Paid')}</Button>
        ) : (
          <Button style={{ backgroundColor: '#F63409', color: 'white' }}>{t('Unpaid')}</Button>
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

  const exportToExcelHandler = () => {
    exportDatasToExcel(data?.results, 'partnerParents', 'Hamkor kiritgan Ota onalar');
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button onClick={() => navigate(-1)}>
          <span style={{ marginRight: '5px' }}>&lt;</span> {t('Back')}
        </Button>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Select defaultValue="all" style={{ width: 130 }} onChange={handleStatusChange}>
            <Option value="all">{t('All')}</Option>
            <Option value="paid">{t('Paid')}</Option>
            <Option value="unpaid">{t('Unpaid')}</Option>
          </Select>
          {/* <Select defaultValue={pageSize} style={{ width: 100 }} onChange={handlePageSizeChange}>
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select> */}
          <Button type="primary" onClick={exportToExcelHandler}>
            {t('Save to Excel')}
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data?.results}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize,
          total: data?.count,
          showSizeChanger: true, // SizeChanger-ni ko'rsatish
          onChange: (page) => setCurrentPage(page), // Sahifani o'zgartirish
          onShowSizeChange: (current, size) => {
            setPageSize(size); // PageSize ni o'zgartirish
            setCurrentPage(1); // Birinchi sahifaga qaytish
          },
        }}
        rowKey="username"
        locale={{
          emptyText: (
            <div className="w-25 m-auto">
              <Lottie animationData={Empty} loop={false} />
            </div>
          ),
        }}
      />
      {/* <Table
        columns={columns}
        dataSource={data?.results}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize,
          total: data?.count,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="username"
        locale={{
          emptyText: (
            <div className="w-25 m-auto">
              <Lottie animationData={Empty} loop={false} />
            </div>
          ),
        }}
      /> */}
    </Card>
  );
};

export default PartnerParentStats;
