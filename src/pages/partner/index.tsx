import React, { useState, useEffect } from 'react';
import {
  Card,
  Space,
  Table,
  Select,
  Pagination,
  Input,
  DatePicker,
} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import dayjs from 'dayjs';

import { errorHandler } from '@config/axios_config';
import { PartnerList, PartnerService } from 'services/openapi';
import TitleCard from '@components/core/TitleCard';
import ConfirmModal from '@components/core/ConfirmModal';
import Empty from '@assets/animated-illusions/empty.json';
import CreateUpdatePartner from './CreateUpdatePartner';
import PartnerInformation from './PartnerInformation';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

const Partners: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [dateRange, setDateRange] = useState<string[]>(['', '']);
   const { t } = useTranslation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['partners', currentPage, pageSize, debouncedSearch, dateRange],
    queryFn: () =>
      PartnerService.partnerListList(
        debouncedSearch,
        pageSize,
        (currentPage - 1) * pageSize,
        dateRange[0] || '',
        dateRange[1] || ''
      ),
    keepPreviousData: true,
  });
console.log(data);
  const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates) {
      const [startDate, endDate] = dates;
      setDateRange([
        startDate ? startDate.format('DD-MM-YYYY') : '',
        endDate ? endDate.format('DD-MM-YYYY') : '',
      ]);
    } else {
      setDateRange(['', '']);
    }
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
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
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: <span className="text-sm">{t("Username")}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-sm">{t("F.I.O")}</span>,
      key: 'fullname',
      dataIndex: 'fullname',
    },
    {
      title: <span className="text-sm">{t("Phone number")}</span>,
      key: 'phone_number',
      render: (record: PartnerList) => record?.phone_number || '-',
    },
    {
      title: <span className="text-sm">{t("Birthday")}</span>,
      key: 'birthday',
      render: (record: PartnerList) => record?.birthday || '-',
    },
    {
      title: <span className="text-sm">Appstore Id</span>,
      key: 'appstore_id',
      render: (record: PartnerList) => record?.appstore_id || '-',
    },
    {
      title: <span className="text-sm">Playstore Id</span>,
      key: 'playstore_id',
      render: (record: PartnerList) => record?.playstore_id || '-',
    },
    {
      title: <span className="text-sm">Actions</span>,
      key: 'action',
      render: (record: PartnerList) => (
        <Space size="middle">
          <PartnerInformation id={record?.id} />
          <CreateUpdatePartner id={record?.id} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deletePartner(record?.id as string | number)}
            title="Delete partner"
          />
        </Space>
      ),
    },
  ];

  const dateFormat = 'DD-MM-YYYY';

  return (
    <>
      <TitleCard titleName="Table of partners">
        <RangePicker size="large" format={dateFormat}
         onChange={handleDateChange} />
        <Input
          style={{ width: '300px' }}
          size="large"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CreateUpdatePartner refetch={refetch} />
      </TitleCard>
      <Card>
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
          pagination={false}
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
