import { FC, useState } from 'react';
import { Button, Card, Form, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { PaymeList } from '../../services/openapi';
import { ColumnsType } from 'antd/es/table';
// import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import CreateOrEditParents from '@pages/parents/crud/createOrEdit';
import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';
import { timeConverter } from '@utils/timeConverter';
import { PaymeService } from 'services/openapi/services/PaymeService';

// const { Title } = Typography;
const Payme: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<{ o: boolean; data: PaymeList | undefined }>({ o: false, data: undefined });
  const paymesReq: any = useQuery({
    queryKey: ['payme'],
    queryFn: () => PaymeService.PaymeGetList()
  });



  const columns: ColumnsType<PaymeList> = [
    {
      title: <span className="text-uppercase">№</span>,
      key: 'id',
      render: ({}, {}, index) => {
        return index + 1;
      },
    },

    {
      title: <span className="text-uppercase">{t('Abonent Code')}</span>,
      dataIndex: 'abonent_code',
      key: 'abonent_code',
    },
    // 'id', 'abonent_code', 'phone_number', 'tariff_price', 'amount', 'created'
    {
      title: <span className="text-uppercase">{t('Phone number')}</span>,
      dataIndex: 'phone_number',
      key: 'phone_number',
   
    },
    {
      title: <span className="text-uppercase">{t('Tariff price')}</span>,
      dataIndex: 'tariff_price',
      key: 'tariff_price',
      render: (record) => record || '-',
    },
    {
      title: <span className="text-uppercase">{t('Payed money')}</span>,
      dataIndex: 'amount',
      key: 'amount',
     
    },
    {
      title: <span className="text-uppercase">{t('Date')}</span>,
      dataIndex: 'created',
      key: 'created',
      render: (record) => (record ? timeConverter(record) : ''),
   
    },

  ];
  console.log(paymesReq?.data)

  return (
    <>
      {/* <CreateOrEditParents
        refetch={() => paymesReq?.refetch()}
        open={open.o}
        data={open.data}
        setOpen={() => setOpen({ o: false, data: undefined })}
        form={form}
      /> */}
      <TitleCard titleName={t('Pay me')} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <CreateUpdatePartner refetch={refetch} /> */}

        {/* <Title level={4}>{t("Table of parents")}</Title> */}
        {/* <Button type="primary" onClick={() => setOpen({ o: true, data: undefined })}>+ {t("Add")}</Button> */}
      </div>
      <Card>
        <Table
          columns={columns}
          bordered={false}
          dataSource={paymesReq?.data?.results}
          loading={paymesReq?.isLoading}
          // rowKey="id"
          scroll={{ x: 1400 }}
          size="small"
          className="text-uppercase"
        />
      </Card>
    </>
  );
};

export default Payme;
