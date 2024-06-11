import { FC } from 'react';
import {  Card,  Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ChildList, ChildService  } from '../../services/openapi';
import { ColumnsType } from 'antd/es/table';
// import CreateOrEditParents from '@pages/parents/crud/createOrEdit';
import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';


const Children: FC = (): JSX.Element => {
  const { t } = useTranslation();
  // const [form] = Form.useForm();
  // const [open, setOpen] = useState<{ o: boolean; data:ChildList | undefined }>({ o: false, data: undefined });
  const childrenReq: any = useQuery({
    queryKey: ['parents'],
    queryFn: () => ChildService.childList(),
  });





  console.log(childrenReq.data);
  const columns: ColumnsType<ChildList> = [
    {
      title: <span className="text-uppercase">№</span>,
      key: 'id',
      render: ({}, {}, index) => {
        return index + 1;
      },
    },

    {
      title: <span className="text-uppercase">{t("Child's name")}</span>,
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: <span className="text-uppercase">{t('The amount of devices')}</span>,
      dataIndex: 'device_count',
      key: 'device_count',
    },
    {
      title: <span className="text-uppercase">{t("Parents' phone number")}</span>,
      dataIndex: 'parent_phone',
      key: 'parent_phone',
    },
    {
      title: <span className="text-uppercase">{t("Partner")}</span>,
      dataIndex: 'partner',
      key: 'partner',
    },
    {
      title: <span className="text-uppercase">{t("Agent")}</span>,
      dataIndex: 'agent',
      key: 'agent',
    },
   

  ];

  return (
    <>
      {/* <CreateOrEditParents
        refetch={() => childrenReq?.refetch()}
        open={open.o}
        data={open.data}
        setOpen={() => setOpen({ o: false, data: undefined })}
        form={form}
      /> */}
        <TitleCard titleName={t('Table of children')} />
      <div className="d-flex justify-content-between align-items-center mb-4">


      </div>
      <Card>
        <Table
          columns={columns}
          bordered={false}
          dataSource={childrenReq?.data?.results}
          loading={childrenReq?.isLoading}
          // rowKey="id"
          scroll={{ x: 1400 }}
          size="small"
        />
      </Card>
    </>
  );
};

export default Children;
