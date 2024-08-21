import { Card, Space, Table } from 'antd';
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
import { useState } from 'react';

const Partners = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const time = new Date();
  const month = months[time.getMonth()];
 
  const pageSize = 15;

  // Fetch data based on current page
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['partners', currentPage], // Query key includes the current page
    queryFn: () => PartnerService.partnerListList(undefined, pageSize, (currentPage - 1) * pageSize),
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
  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ['agents'],
  //   queryFn: () => PartnerService.partnerListList(),
  // });

  const deletePartner = async (id: string | number) => {
    try {
      await PartnerService.partnerDeleteNowDelete(id);
      refetch();
    } catch (error: any) {
      errorHandler(error?.body?.detail);
    }
  };
console.log(data);
  const columns: ColumnsType<PartnerList> = [
    {
      title: <span className=" text-sm">id</span>,
      key: 'id',
      // render: (record) => {
      //   let index = data?.results?.indexOf(record);
      //   return Number(index) + 1;
      // },
      render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,    },
    {
      title: <span className=" text-sm">{t('Username')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className=" text-sm">{t('F.I.O')}</span>,
      key: 'fullname',
      dataIndex: 'fullname',
    },

    {
      title: <span className=" text-sm">{t('Birthday')}</span>,
      key: 'birthday',
      render: (record: PartnerList) => {
        return record?.birthday || '-';
      },
    },
    {
      title: <span className=" text-sm">{t('Appstore Id')}</span>,
      key: 'appstore_id',
      render: (record: PartnerList) => {
        return record?.appstore_id || '-';
      },
    },
    {
      title: <span className=" text-sm">{t('Playstore Id')}</span>,
      key: 'playstore_id',
      render: (record: PartnerList) => {
        return record?.playstore_id || '-';
      },
    },
    
    {
      title: <span className=" text-sm">{t('Work percentage')}</span>,
      dataIndex: 'monthly_percentages',
      key: 'monthly_percentages',
      render: (record) => {
        const hasPercent = record.length && record.find((item: { month: string; }) => item.month === month);
        return hasPercent ? `${hasPercent?.percentage}%` : '50%';
      },
    },

    {
      title: <span className=" text-sm "> {t('Actions')} </span>,
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
        <CreateUpdatePartner refetch={refetch} />
      </TitleCard>

      <Card>
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
          // pagination={{
          //   pageSize: 15,
          //   onChange: (page) => {
          //     setCurrentPage(page);
          //   },
          // }}
          pagination={paginationConfig}
          dataSource={data?.results}
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

export default Partners;
