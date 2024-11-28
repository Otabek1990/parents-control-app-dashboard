import { Button, Card, Table, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import Empty from '@assets/animated-illusions/empty.json';
import { PartnerDetailList, PartnerDetailService } from 'services/openapi/services/PartnerDetailService';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PartnerStats = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // O'lchamni belgilash uchun holat
  
  const { data, isLoading } = useQuery({
    queryKey: ['partnerStats', currentPage, pageSize],
    queryFn: () => PartnerDetailService.partnerDetailList(), // API chaqiruv
  });

  const columns: ColumnsType<PartnerDetailList> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      render: ({}, {}, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: <span className="text-uppercase">{t('Username')}</span>,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: <span className="text-uppercase">{t('Parent count')}</span>,
      key: 'parent_count',
      dataIndex: 'parent_count',
    },
    {
      title: <span className="text-uppercase">{t('Total profit')}</span>,
      key: 'total_profit',
      dataIndex: 'total_profit',
    },
  ];

  return (
    <>
      <Card>
        <Button onClick={() => navigate(-1)}>
          <span style={{ marginRight: '5px' }}>&lt;</span> {t('Back')}
        </Button>

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
          pagination={{
            pageSize,
            current: currentPage,
            total: data?.length || 0, // Ma'lumotlar umumiy miqdori
            showSizeChanger: false, // Default pagination uchun select o'chiriladi
            onChange: (page) => setCurrentPage(page),
          }}
          dataSource={data}
          loading={isLoading}
          rowKey="username"
          scroll={{ x: 1000 }}
          size="small"
          style={{ textTransform: 'capitalize' }}
          footer={() => (
            <div style={{ display: 'flex', justifyContent: 'flex-end',alignItems:"center", gap: '10px' }}>
              <span>{t('Rows per page')}:</span>
              <Select
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1); // Sahifani qayta 1 ga o'rnatish
                }}
                options={[
                  { value: 10, label: '10' },
                  { value: 25, label: '25' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' },
                ]}
                style={{ width: 80 }}
              />
            </div>
          )}
        />
      </Card>
    </>
  );
};

export default PartnerStats;
