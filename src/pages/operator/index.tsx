import { DeleteOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { useQuery } from '@tanstack/react-query';
import { Card, Space,  Table, Pagination, Select, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { OperatorList, OperatorService } from 'services/openapi';
import CreateUpdateOperator from './CreateUpdateOperator';
import { useTranslation } from 'react-i18next';
import OperatorInformation from './OperatorInformation';
import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';
import ConfirmModal from '@components/core/ConfirmModal';
import { timeConverter } from '@utils/timeConverter';
import { useEffect, useState } from 'react';
import TitleCard from '@components/core/TitleCard';

const Operators = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Debounced search term

  const { t } = useTranslation();
  // Debouncing for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400); // 500ms delay for debouncing
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['operators', currentPage, pageSize,debouncedSearch],
    queryFn: () => OperatorService.operatorListList(debouncedSearch, pageSize, (currentPage - 1) * pageSize),
  });
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to the first page
  };
  const deleteAgent = async (id: string | number) => {
    try {
      await OperatorService.operatorDeleteNowDelete(id);
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
      title: <span className="text-uppercase">{t('Phone number')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-uppercase">{t('F.I.O')}</span>,
      key: 'fullname',
      dataIndex: 'fullname',
    },
    {
      title: <span className="text-uppercase">{t('Daily call limit')}</span>,
      key: 'daily_call_limit',
      dataIndex: 'daily_call_limit',
    },

    {
      title: <span className="text-uppercase">{t('Created date')}</span>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (record) => {
        return timeConverter(record);
      },
    },
    {
      title: <span className="text-uppercase"> {t('Actions')} </span>,
      key: 'action',
      render: (record: OperatorList) => (
        <Space size="middle">
          <OperatorInformation id={record?.id} />
          <CreateUpdateOperator id={record.id} refetch={refetch} />
          <ConfirmModal
            btnType="dashed"
            icon={<DeleteOutlined />}
            handleSubmit={() => deleteAgent(record?.id as string | number)}
            title={t('Delete operator')}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
     
      <TitleCard titleName="Table of Operators">
        <Input
          style={{ width: '300px' }}
          size="large"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <CreateUpdateOperator refetch={refetch} />
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
          scroll={{ x: 1000 }}
          size="small"
          pagination={false}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.count || 0}
            onChange={(page) => setCurrentPage(page)}
          />
          <Select
            defaultValue={10}
            value={pageSize}
            onChange={handlePageSizeChange}
            options={[
              { value: 10, label: '10' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 100, label: '100' },
            ]}
            style={{ width: 100 }}
          />
        </div>
      </Card>
    </>
  );
};

export default Operators;
