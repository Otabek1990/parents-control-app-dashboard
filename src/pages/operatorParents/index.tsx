import { FC, useEffect, useState } from 'react';
import { Button, Card, DatePicker, Empty, Input,  Pagination, Select, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';
import { timeConverter } from '@utils/timeConverter';
import Loading from '@components/core/Loading';
import dayjs from 'dayjs';
import Lottie from 'lottie-react';

import { OperatorParentsList, OperatorParentsService } from 'services/openapi/services/OperatorParentService';
import ReserveCallButtons from './ReserveCallButtons';

const { RangePicker } = DatePicker;

const OperatorParents: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Debounced search ter
  const [pageSize, setPageSize] = useState(10); // Default page size is 10
  const [dateRange, setDateRange] = useState<string[]>(['', '']);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms delay for debouncing
    return () => clearTimeout(handler);
  }, [searchTerm]);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['operator-parents', currentPage, pageSize, debouncedSearch, dateRange], // Query key includes current page and page size
    queryFn: () =>
      OperatorParentsService.operatorParentsList(
        debouncedSearch,
        pageSize,
        (currentPage - 1) * pageSize,
        dateRange[0] || '',
        dateRange[1] || '',
      ),
    keepPreviousData: true, // Keeps previous data while fetching the new page
  });
  console.log(data);
  const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates) {
      const [startDate, endDate] = dates;
      setDateRange([startDate ? startDate.format('DD-MM-YYYY') : '', endDate ? endDate.format('DD-MM-YYYY') : '']);
    } else {
      setDateRange(['', '']);
    }
    setCurrentPage(1);
  };
  // const paginationConfig = {
  //   current: currentPage,
  //   pageSize: pageSize,
  //   total: data?.count || 0, // Total count from API response
  //   pageSizeOptions: ['10', '25', '50', '100'], // Set available page sizes
  //   onChange: (page: number) => {
  //     setCurrentPage(page); // Update page number
  //   },
  //   onShowSizeChange: (current: number, size: number) => {
  //     setPageSize(size); // Update page size
  //     setCurrentPage(current); // Reset to first page on page size change
  //   },
  // };

  const columns: ColumnsType<OperatorParentsList> = [
    {
      title: <span className="text-uppercase">№</span>,
      key: 'id',
      render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: <span className="text-uppercase">{t('User phone number')}</span>,
      // dataIndex: 'username',
      key: 'username',
      render: (record) => (
        <>
          <span>{record?.username}</span>

          <ReserveCallButtons parentData={record} />
        </>
      ),
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
        record?.status === 'Paid' ? (
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
      title: <span className="text-uppercase">{t('Operator')}</span>,
      dataIndex: 'operator',
      key: 'operator',
      render: (record) => record || '-',
    },
    {
      title: <span className="text-uppercase">{t('Created date')}</span>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (record) => (record ? timeConverter(record) : ''),
    },
    {
      title: <span className="text-uppercase">{t('Last visit')}</span>,
      dataIndex: 'last_login',
      key: 'last_login',
      render: (record) => (record ? timeConverter(record) : ''),
    },
  ];
  const dateFormat = 'DD-MM-YYYY';
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  return (
    <>
      <TitleCard titleName={t('Table of parents')}>
        <RangePicker size="large" format={dateFormat} onChange={handleDateChange} />
        <Input
          style={{ width: '300px' }}
          size="large"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </TitleCard>
      <div className="d-flex justify-content-between align-items-center mb-4"></div>
      {isLoading && <Loading />}
      <Card>
        {isSuccess && data?.results && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBlock: '1rem' }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data?.count || 0}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false} // Disable default page size changer
                showQuickJumper={false} // Disable quick jumper
              />
              <Select
                defaultValue={10}
                value={pageSize}
                onChange={handlePageSizeChange}
                options={[
                  { value: 10, label: '10' },
                  { value: 25, label: '25' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' },
                ]}
                style={{ width: 100 }}
              />
            </div>
            <Table
              locale={{
                emptyText: (
                  <div className="w-25 m-auto">
                    <Lottie animationData={Empty} loop={false} />
                  </div>
                ),
              }}
              pagination={false}
              columns={columns}
              bordered={false}
              dataSource={isSuccess ? data?.results : []}
              loading={isLoading}
              rowKey="id"
              scroll={{ x: 1400 }}
              size="small"
              className="text-uppercase"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data?.count || 0}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false} // Disable default page size changer
                showQuickJumper={false} // Disable quick jumper
              />
              <Select
                defaultValue={10}
                value={pageSize}
                onChange={handlePageSizeChange}
                options={[
                  { value: 10, label: '10' },
                  { value: 25, label: '25' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' },
                ]}
                style={{ width: 100 }}
              />
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default OperatorParents;
