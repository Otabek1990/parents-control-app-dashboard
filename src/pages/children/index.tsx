import { FC, useEffect, useState } from 'react';
import { Card, Input, Pagination, Select, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ChildList, ChildService } from '../../services/openapi';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';
import Loading from '@components/core/Loading';

const Children: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms delay for debouncing
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['children', currentPage, pageSize,debouncedSearch], // Query key includes current page and page size
    queryFn: () => ChildService.childList(debouncedSearch, pageSize, (currentPage - 1) * pageSize),
    keepPreviousData: true, // Keeps previous data while fetching the new page
  });
console.log(data);

  const role = localStorage.getItem('role');

  const columns: ColumnsType<ChildList> =
    role === 'ADMIN'
      ? [
          {
            title: <span className="text-uppercase">№</span>,
            key: 'id',
            render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,
          },
          {
            title: <span className="text-uppercase">{t("Child's name")}</span>,
            dataIndex: 'fullname',
            key: 'fullname',
          },
          {
            title: <span className="text-uppercase">{t('The amount of devices')}</span>,
            dataIndex: 'device_count',
            key: 'device_count',
          },
          {
            title: <span className="text-uppercase">{t("Parents' phone number")}</span>,
            dataIndex: 'parent_phone',
            key: 'parent_phone',
          },
          {
            title: <span className="text-uppercase">{t('Partner')}</span>,
            dataIndex: 'partner',
            key: 'partner',
          },
          {
            title: <span className="text-uppercase">{t('Agent')}</span>,
            dataIndex: 'agent',
            key: 'agent',
          },
        ]
      : [
          {
            title: <span className="text-uppercase">№</span>,
            key: 'id',
            render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,
          },
          {
            title: <span className="text-uppercase">{t("Child's name")}</span>,
            dataIndex: 'fullname',
            key: 'fullname',
          },
          {
            title: <span className="text-uppercase">{t('The amount of devices')}</span>,
            dataIndex: 'device_count',
            key: 'device_count',
          },
          {
            title: <span className="text-uppercase">{t("Parents' phone number")}</span>,
            dataIndex: 'parent_phone',
            key: 'parent_phone',
          },
        ];
        const handlePageSizeChange = (value: number) => {
          setPageSize(value);
          setCurrentPage(1);
        };
  return (
    <>
      <TitleCard titleName={t('Table of children')}>
        <Input
          style={{ width: '300px' }}
          size="large"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </TitleCard>
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
            pagination={false}
            columns={columns}
            bordered={false}
            dataSource={data?.results}
            loading={isLoading}
            rowKey="id"
            scroll={{ x: 1400 }}
            size="small"
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

export default Children;
