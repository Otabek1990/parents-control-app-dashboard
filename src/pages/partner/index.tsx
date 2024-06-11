import { Card,  Space, Table } from 'antd';
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

const Partners = () => {
  const { t } = useTranslation();


  const { data, isLoading, refetch } = useQuery({
    queryKey: ['agents'],
    queryFn: () => PartnerService.partnerListList(),
  });

  const deleteAgent = async (guid: string | number) => {
    try {
      await PartnerService.partnerDeleteNowDelete(guid);
      refetch();
    } catch (error: any) {
      errorHandler(error?.body?.detail);
    }
  };

  const columns: ColumnsType<PartnerList> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: (record) => {
        let index = data?.results?.indexOf(record);
        return Number(index) + 1;
      },
    },
    {
      title: <span className="text-uppercase">{t('Username')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-uppercase">{t('F.I.O')}</span>,
      key: 'fullname',
      dataIndex: 'fullname',
    },
    // {
    //   title: <span className="text-uppercase">{t('Name')}</span>,
    //   key: 'name',
    //   dataIndex: 'name',
    // },
    // {
    //   title: <span className="text-uppercase">{t('Surname')}</span>,
    //   key: 'surname',
    //   render: (record: PartnerList) => {
    //     return record?.surname;
    //   },
    // },
    // {
    //   title: <span className="text-uppercase">{t('Middlename')}</span>,
    //   key: 'middle_name',
    //   render: (record: PartnerList) => {
    //     return record?.middle_name;
    //   },
    // },
    {
      title: <span className="text-uppercase">{t('Birthday')}</span>,
      key: 'birthday',
      render: (record: PartnerList) => {
        return record?.birthday || "-";
      },
    },
    {
      title: <span className="text-uppercase">{t('Appstore Id')}</span>,
      key: 'appstore_id',
      render: (record: PartnerList) => {
        return record?.appstore_id || "-";
      },
    },
    {
      title: <span className="text-uppercase">{t('Playstore Id')}</span>,
      key: 'playstore_id',
      render: (record: PartnerList) => {
        return record?.playstore_id || "-";
      },
    },
    {
      title: <span className="text-uppercase">{t('Work percentage')}</span>,
      dataIndex: 'percentage_of_work',
      key: 'percentage_of_work',
      render: (record) => record + '%',
    },

    {
      title: <span className="text-uppercase "> {t('Actions')} </span>,
      key: 'action',
      render: (record: PartnerList) => (
        <Space size="middle">
          <PartnerInformation id={record?.id} />
          <CreateUpdatePartner id={record?.id} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deleteAgent(record?.id as (string | number))}
            title="Delete partner"
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
