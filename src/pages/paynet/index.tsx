import { FC} from 'react';
import { Card, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { PaymeList } from '../../services/openapi';
import { ColumnsType } from 'antd/es/table';
// import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';
import { timeConverter } from '@utils/timeConverter';
import { PaynetService } from 'services/openapi/services/PaynetService';

// const { Title } = Typography;
const Paynet: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const paymesReq: any = useQuery({
    queryKey: ['paynet'],
    queryFn: () => PaynetService.PaynetGetList()
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


  return (
    <>
    
      <TitleCard titleName={t('Paynet')} />
    
      <Card>
        <Table
          columns={columns}
          bordered={false}
          dataSource={paymesReq?.data}
          loading={paymesReq?.isLoading}
          rowKey="id"
          scroll={{ x: 1400 }}
          size="small"
          className="text-uppercase"
        />
      </Card>
    </>
  );
};

export default Paynet;