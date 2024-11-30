import { FC, useState } from 'react';
import { Button, Card, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ParentList, ParentService } from '../../services/openapi';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';
import { timeConverter } from '@utils/timeConverter';
import Loading from '@components/core/Loading';

const Parents: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size is 10

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['parents', currentPage, pageSize], // Query key includes current page and page size
    queryFn: () => ParentService.parentListList(undefined, pageSize, (currentPage - 1) * pageSize),
    keepPreviousData: true, // Keeps previous data while fetching the new page
  });

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: data?.count || 0, // Total count from API response
    pageSizeOptions: ['10', '25', '50', '100'], // Set available page sizes
    onChange: (page: number) => {
      setCurrentPage(page); // Update page number
    },
    onShowSizeChange: (current: number, size: number) => {
      setPageSize(size); // Update page size
      setCurrentPage(current); // Reset to first page on page size change
    },
  };

  const columns: ColumnsType<ParentList> = [
    {
      title: <span className="text-uppercase">№</span>,
      key: 'id',
      render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: <span className="text-uppercase">{t('User phone number')}</span>,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <span className="text-uppercase">{t('Abonent code')}</span>,
      dataIndex: 'abonent_code',
      key: 'abonent_code',
    },
    {
      title: <span className="text-uppercase">{t('Status')}</span>,
      dataIndex: 'status',
      key: 'status',
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
      title: <span className="text-uppercase">{t('Tariff name')}</span>,
      dataIndex: 'tariff_name',
      key: 'tariff_name',
      render: (record) => record || '-',
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
      <TitleCard titleName={t('Table of parents')} />
      <div className="d-flex justify-content-between align-items-center mb-4"></div>
      {isLoading && <Loading />}
      <Card>
        {isSuccess && data?.results && (
          <Table
            pagination={paginationConfig}
            columns={columns}
            bordered={false}
            dataSource={isSuccess ? data?.results : []}
            loading={isLoading}
            rowKey="id"
            scroll={{ x: 1400 }}
            size="small"
            className="text-uppercase"
          />
        )}
      </Card>
    </>
  );
};

export default Parents;
