import { Card, Space, Table, Typography } from 'antd';
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

const Partners = () => {
  const { t } = useTranslation();
  const { Title } = Typography;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['agents'],
    queryFn: () => PartnerService.partnerListList(),
  });

  const deleteAgent = async (guid: string) => {
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
      title: <span className="text-uppercase">{t('Legal name')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-uppercase">{t('FIO')}</span>,
      key: 'name',
      render: (record: PartnerList) => {
        return record?.surname + ' ' + record.name;
      },
    },
    {
      title: <span className="text-uppercase">{t('Work percentage')}</span>,
      dataIndex: 'percentage_of_work',
      key: 'percentage_of_work',
      render: (record) => record + '%',
    },
    {
      title: <span className="text-uppercase">{t('Agents count')}</span>,
      key: 'agents',
    },
    {
      title: <span className="text-uppercase">{t('Customers')}</span>,
      key: 'clients',
    },
    {
      title: <span className="text-uppercase">{t('Payments')}</span>,
      key: 'payment',
    },
    {
      title: <span className="text-uppercase"> {t('Actions')} </span>,
      key: 'action',
      render: (record: PartnerList) => (
        <Space size="middle">
          <PartnerInformation id={record.guid} />
          <CreateUpdatePartner id={record.guid} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deleteAgent(record.guid as string)}
            title="Delete partner"
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Title level={4}>{t('Table of partners')}</Title>
        <CreateUpdatePartner refetch={refetch} />
      </div>
      <Card>
        <Table
          columns={columns}
          bordered={false}
          locale={{
            emptyText: (
              <div className="w-25 m-auto">
                <Lottie animationData={Empty} loop={false}></Lottie>
              </div>
            ),
          }}
          dataSource={data?.results}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: 1000 }}
          size="small"
        />
      </Card>
    </>
  );
};

export default Partners;
