import { Card, Space, Table } from 'antd';
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
import TitleCard from '@components/core/TitleCard';
import { timeConverter } from '@utils/timeConverter';

const Agents = () => {
  const { t } = useTranslation();

  const { data, isLoading, refetch } = useQuery({ queryKey: ['agents'], queryFn: () => AgentService.agentListList() });
 
  const deleteAgent = async (guid: string | number) => {
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
    //   render: (record: AgentList) => {
    //     return record?.surname;
    //   },
    // },
    // {
    //   title: <span className="text-uppercase">{t('Middlename')}</span>,
    //   key: 'middle_name',
    //   render: (record: AgentList) => {
    //     return record?.middle_name;
    //   },
    // },
    {
      title: <span className="text-uppercase">{t('Birthday')}</span>,
      key: 'birthday',
      render: (record: AgentList) => {
        return record?.birthday || '-';
      },
    },
    {
      title: <span className="text-uppercase">{t('Partners')}</span>,
      dataIndex: 'partner',
      key: 'partner',
      render: (record: AgentList) => {
        return record?.partner || '-';
      },
      
    },
    {
      title: <span className="text-uppercase">{t('Created Time')}</span>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (record) => timeConverter(record),
    },

    // {
    //   title: <span className="text-uppercase text-center">{t('Work percentage')} %</span>,
    //   dataIndex: 'percentage_of_work',
    //   key: 'percentage_of_work',
    //   render: (record) => record + '%',
    // },

    // {
    //   title: <span className="text-uppercase">{t('Work percentage')}</span>,
    //   children: [
    //     {
    //       title: <span className="text-uppercase text-center">{t('Percentage')} %</span>,
    //       dataIndex: 'percentage_of_work',
    //       key: 'percentage_of_work',
    //       render: (record) => record + '%',
    //     },
    //     {
    //       title: <span className="text-uppercase text-center">{t('For a unit')}</span>,
    //       dataIndex: 'money_for_each_child',
    //       key: 'money_for_each_child',
    //     },
    //   ],
    //   key: 'percentage',
    // },
    // {
    //   title: <span className="text-uppercase">{t('Visited')}</span>,
    //   key: 'visitors',
    // },
    // {
    //   title: <span className="text-uppercase">{t('Customers')}</span>,
    //   key: 'clients',
    // },
    // {
    //   title: <span className="text-uppercase">{t('Payments')}</span>,
    //   key: 'payment',
    // },
    {
      title: <span className="text-uppercase"> {t('Actions')} </span>,
      key: 'action',
      render: (record: AgentList) => (
        <Space size="middle">
          <AgentInformation id={record?.id} />
          <CreateUpdateAgent id={record?.id} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deleteAgent(record.id as (string | number))}
            title={t('Delete the agent')}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <TitleCard titleName="Table of agents">
        <CreateUpdateAgent refetch={refetch} />
      </TitleCard>
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
          scroll={{ x: 992 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
        />
      </Card>
    </>
  );
};

export default Agents;
