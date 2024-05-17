import { DeleteOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Space, Typography, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { OperatorList, OperatorService } from 'services/openapi';
import CreateUpdateOperator from './CreateUpdateOperator';
import { useTranslation } from 'react-i18next';
import OperatorInformation from './OperatorInformation';
import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';

const Operators = () => {
  const { Title } = Typography;
  const { t } = useTranslation();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['agents'],
    queryFn: () => OperatorService.operatorListList(),
  });

  const deleteAgent = async (guid: string) => {
    try {
      await OperatorService.operatorDeleteNowDelete(guid);
      refetch();
    } catch (error: any) {
      errorHandler(error?.body?.detail);
    }
  };

  const columns: ColumnsType<OperatorList> = [
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
      render: (record: OperatorList) => {
        return record?.surname + ' ' + record.name + ' ' + record.middle_name;
      },
    },
    {
      title: <span className="text-uppercase">{t('Created date')}</span>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (record) => {
        return new Date(record).toLocaleDateString();
      },
    },
    {
      title: <span className="text-uppercase"> {t('Actions')} </span>,
      key: 'action',
      render: (record: OperatorList) => (
        <Space size="middle">
          <OperatorInformation id={record?.guid} />
          <CreateUpdateOperator id={record.guid} refetch={refetch} />
          <Button type="dashed" onClick={() => deleteAgent(record.guid as string)} icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Title level={4}>{t('Table of Operators')}</Title>
        <CreateUpdateOperator refetch={refetch} />
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

export default Operators;
