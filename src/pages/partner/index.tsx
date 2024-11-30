import { Card, Space, Table, Select, Pagination, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { PartnerList, PartnerService } from 'services/openapi';
import CreateUpdatePartner from './CreateUpdatePartner';
import ConfirmModal from '@components/core/ConfirmModal';
import { useTranslation } from 'react-i18next';
import PartnerInformation from './PartnerInformation';
import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';

import TitleCard from '@components/core/TitleCard';
import { months } from './months';
import { useState, useEffect } from 'react';

const Partners = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Debounced search term
  const { t } = useTranslation();
  const time = new Date();
  const month = months[time.getMonth()];

  // Debouncing for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms delay for debouncing
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['partners', currentPage, pageSize, debouncedSearch],
    queryFn: () =>
      PartnerService.partnerListList(debouncedSearch, pageSize, (currentPage - 1) * pageSize),
    keepPreviousData: true,
  });

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to the first page
  };

  const deletePartner = async (id: string | number) => {
    try {
      await PartnerService.partnerDeleteNowDelete(id);
      refetch();
    } catch (error: any) {
      errorHandler(error?.body?.detail);
    }
  };

  const columns: ColumnsType<PartnerList> = [
    {
      title: <span className="text-sm">id</span>,
      key: 'id',
      render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: <span className="text-sm">{t('Username')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-sm">{t('F.I.O')}</span>,
      key: 'fullname',
      dataIndex: 'fullname',
    },
    {
      title: <span className="text-sm">{t('Birthday')}</span>,
      key: 'birthday',
      render: (record: PartnerList) => record?.birthday || '-',
    },
    {
      title: <span className="text-sm">{t('Appstore Id')}</span>,
      key: 'appstore_id',
      render: (record: PartnerList) => record?.appstore_id || '-',
    },
    {
      title: <span className="text-sm">{t('Playstore Id')}</span>,
      key: 'playstore_id',
      render: (record: PartnerList) => record?.playstore_id || '-',
    },
    {
      title: <span className="text-sm">{t('Work percentage')}</span>,
      dataIndex: 'monthly_percentages',
      key: 'monthly_percentages',
      render: (record) => {
        const hasPercent = record.length && record.find((item: { month: string }) => item.month === month);
        return hasPercent ? `${hasPercent?.percentage}%` : '50%';
      },
    },
    {
      title: <span className="text-sm">{t('Actions')}</span>,
      key: 'action',
      render: (record: PartnerList) => (
        <Space size="middle">
          <PartnerInformation id={record?.id} />
          <CreateUpdatePartner id={record?.id} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deletePartner(record?.id as string | number)}
            title={t('Delete partner')}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <TitleCard titleName="Table of partners">
        <Input
          style={{ width: '300px' }}
          size="large"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <CreateUpdatePartner refetch={refetch} />
      </TitleCard>
      <Card>
        <Table
          columns={columns}
          bordered={false}
          locale={{
            emptyText: (
              <div className="w-25 m-auto">
                <Lottie animationData={Empty} loop={false} />
              </div>
            ),
          }}
          dataSource={data?.results}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
          pagination={false} // Disable built-in pagination
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.count || 0}
            onChange={(page) => setCurrentPage(page)}
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
      </Card>
    </>
  );
};

export default Partners;
