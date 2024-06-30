import { Card, Space, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
// import { errorHandler } from '@config/axios_config';
import ConfirmModal from '@components/core/ConfirmModal';
import { useTranslation } from 'react-i18next';
import BannerInformation from './BannerInformation';
import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';

import TitleCard from '@components/core/TitleCard';
import CreateUpdateBanner from './CreateUpdateBanner';
import { timeConverter } from '@utils/timeConverter';
import { errorHandler } from '@config/axios_config';
import { BannerService } from 'services/openapi/services/BannerService';
import { BannerList } from 'services/openapi/models/BannerList';

const Banner = () => {
  const { t } = useTranslation();

  const {
    data: banners,
    isLoading,
    refetch,
    
  } = useQuery({
    queryKey: ['banner'],
    queryFn: () => BannerService.bannerList(),
  });

  const deleteBanner = async (id: number) => {
    try {
      await BannerService.bannerDelete(id);
      refetch();
    } catch (error: any) {
      errorHandler(error?.body?.detail);
    }
  };
console.log(banners)
  const columns: ColumnsType<BannerList> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: ({}, {}, index) => {
        return Number(index) + 1;
      },
    },
    {
      title: <span className="text-uppercase">{t('Partner')}</span>,
      key: 'company_partner',
      dataIndex: 'company_partner',
    },
    {
      title: <span className="text-uppercase">{t('Money amount')}</span>,
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: <span className="text-uppercase">{t('Date')}</span>,
      key: 'created_at',
      dataIndex: 'created_at',
      render: (record) => {
        return record ? timeConverter(record) : '-';
      },
    },
    {
      title: <span className="text-uppercase">{t('Currency')}</span>,
      key: 'currency',
      dataIndex: 'currency',
    },

    {
      title: <span className="text-uppercase "> {t('Actions')} </span>,
      key: 'action',
      render: (record: BannerList) => (
        <Space size="middle">
          <BannerInformation id={record?.id} />
          <CreateUpdateBanner id={record?.id} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deleteBanner(record?.id as number)}
            title={t('Delete banner')}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <TitleCard titleName="Banners">
        <CreateUpdateBanner refetch={refetch} />
      </TitleCard>

      {/* <Card>
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
          dataSource={paymentsToPartner}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
        />
      </Card> */}
    </>
  );
};

export default Banner;
