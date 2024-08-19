import { Button, Card, Table } from 'antd';
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
  const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading} = useQuery({
    queryKey: ['partnerStats'],
    queryFn: () => PartnerDetailService.partnerDetailList(),
  });
  console.log(data);

  const columns: ColumnsType<PartnerDetailList> = [
    {
      title: <span className="text-uppercase">id</span>,
      key: 'id',
      // render: ({}, {}, index: number) => {
      //   return Number(index) + 1;
      // },
      render: ({}, {}, index) => (currentPage - 1) * 10 + index + 1,
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
        <Button onClick={()=>navigate(-1)}>
         <span style={{marginRight:"5px"}}>&lt;</span> {t("Back")}
        </Button>


        
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
          pagination={{
            pageSize: 10,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
          dataSource={data}
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

export default PartnerStats;
