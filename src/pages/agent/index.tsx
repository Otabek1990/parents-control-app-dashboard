import { Card, Space, Table, Typography } from 'antd';
import CreateUpdateAgent from './CreateUpdateAgent';
import { useQuery } from '@tanstack/react-query';
import { ColumnsType } from 'antd/es/table';
import { AgentList, AgentService } from 'services/openapi';
import { DeleteOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import ConfirmModal from '@components/core/ConfirmModal';
import { useTranslation } from 'react-i18next';
import AgentInformation from './AgentInformation';
import Empty from '@assets/animated-illusions/empty.json';
import Lottie from 'lottie-react';

const Agents = () => {
  const { t } = useTranslation();
  const { Title } = Typography;

  // const { data, isLoading, refetch } = useQuery({ queryKey: ['agents'], queryFn: () => AgentService.agentListList() });

  const deleteAgent = async (guid: string) => {
    try {
      await AgentService.agentDeleteNowDelete(guid);
      // refetch();
    } catch (error: any) {
      errorHandler(error?.body?.detail);
    }
  };

  const columns: ColumnsType<AgentList> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: (record) => {
        // let index = data?.results?.indexOf(record);
        let index = 0;
        return Number(index) + 1;
      },
    },
    {
      title: <span className="text-uppercase">FIO</span>,
      key: 'name',
      render: (record: AgentList) => {
        return record?.surname + ' ' + record.name;
      },
    },
    {
      title: <span className="text-uppercase">{t('Partners')}</span>,
      dataIndex: 'get_partner_full_name',
      key: 'get_partner_full_name',
    },
    {
      title: <span className="text-uppercase">{t('Work percentage')}</span>,
      children: [
        {
          title: <span className="text-uppercase text-center">{t('Percentage')} %</span>,
          dataIndex: 'percentage_of_work',
          key: 'percentage_of_work',
          render: (record) => record + '%',
        },
        {
          title: <span className="text-uppercase text-center">{t('For a unit')}</span>,
          dataIndex: 'money_for_each_child',
          key: 'money_for_each_child',
        },
      ],
      key: 'percentage',
    },
    {
      title: <span className="text-uppercase">{t('Visited')}</span>,
      key: 'visitors',
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
      render: (record: AgentList) => (
        <Space size="middle">
          <AgentInformation id={record?.guid} />
          <CreateUpdateAgent
            id={record.guid}
            //  refetch={refetch}
           
          />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deleteAgent(record.guid as string)}
            title={t('Delete the agent')}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Title level={4}>{t('Table of agents')}</Title>
        {/* <CreateUpdateAgent refetch={refetch} /> */}
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
          // dataSource={data?.results}
          dataSource={[]}
          // loading={isLoading}
          loading={false}
          rowKey="id"
          scroll={{ x: 992 }}
          size="small"
        />
      </Card>
    </>
  );
};

export default Agents;
