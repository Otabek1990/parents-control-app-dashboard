import { FC, useState } from 'react';
import { Card, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ChildList, ChildService } from '../../services/openapi';
import { ColumnsType } from 'antd/es/table';
// import CreateOrEditParents from '@pages/parents/crud/createOrEdit';
import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';
import Loading from '@components/core/Loading';

const Children: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['children', currentPage], // Query key includes the current page
    queryFn: () => ChildService.childList(undefined, pageSize, (currentPage - 1) * pageSize),
    keepPreviousData: true, // Keeps previous data while fetching the new page
  });

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: data?.count || 0, // Total count from API response
    onChange: (page: number) => {
      setCurrentPage(page); // Update page number
    },
  };

  const role = localStorage.getItem('role');

  const columns: ColumnsType<ChildList> =
    role === 'ADMIN'
      ? [
          {
            title: <span className="text-uppercase">№</span>,
            key: 'id',
            render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,          },

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
            render: ({}, {}, index) => {
              return index + 1;
            },
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

  return (
    <>
      {/* <CreateOrEditParents
        refetch={() => refetch()}
        open={open.o}
        data={open.data}
        setOpen={() => setOpen({ o: false, data: undefined })}
        form={form}
      /> */}
      <TitleCard titleName={t('Table of children')} />
      <div className="d-flex justify-content-between align-items-center mb-4"></div>
      {isLoading && <Loading />}
      <Card>
        {isSuccess && data?.results && (
          <Table
          pagination={paginationConfig}
            columns={columns}
            bordered={false}
            dataSource={data?.results}
            loading={isLoading}
            rowKey="id"
            scroll={{ x: 1400 }}
            size="small"
          />
        )}
      </Card>
    </>
  );
};

export default Children;
