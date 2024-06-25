import { Card, Space, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
// import { errorHandler } from '@config/axios_config';
import { PaymentToPartnerList, PaymentToPartnerService } from 'services/openapi';
import ConfirmModal from '@components/core/ConfirmModal';
import { useTranslation } from 'react-i18next';
import PaymentToPartnerInformation from './PaymentToPartnerInformation';
import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';

import TitleCard from '@components/core/TitleCard';
import CreatePaymentToPartner from './CreatePaymentToPartner';
import { timeConverter } from '@utils/timeConverter';

const PaymentToPartner = () => {
  const { t } = useTranslation();

  const {
    data: paymentsToPartner,
    isLoading,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: ['paymentToPartner'],
    queryFn: () => PaymentToPartnerService.paymentToPartnerGetList(),
  });

  // const deleteAgent = async (guid: string | number) => {
  //   try {
  //     await PartnerService.partnerDeleteNowDelete(guid);
  //     refetch();
  //   } catch (error: any) {
  //     errorHandler(error?.body?.detail);
  //   }
  // };
  console.log(paymentsToPartner);

  const columns: ColumnsType<PaymentToPartnerList> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: ({},{},index) => {
      
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
      dataIndex:"created_at",
      render: (record) => {
        console.log(record)
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
      render: (record: PaymentToPartnerList) => (
        <Space size="middle">
          <PaymentToPartnerInformation id={record?.id} />
          <CreatePaymentToPartner id={record?.id} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            // handleSubmit={() => deleteAgent(record?.id as string | number)}
            title="Delete partner"
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <TitleCard titleName="Payments">
        <CreatePaymentToPartner refetch={refetch} />
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
          dataSource={paymentsToPartner}
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

export default PaymentToPartner;
