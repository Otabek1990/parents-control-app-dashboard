import { FC, useState } from 'react';
import { Card, Form, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ParentList, ParentService } from '../../services/openapi';
import { ColumnsType } from 'antd/es/table';
// import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import CreateOrEditParents from '@pages/parents/crud/createOrEdit';
import { useTranslation } from 'react-i18next';
import TitleCard from '@components/core/TitleCard';
import { timeConverter } from '@utils/timeConverter';

// const { Title } = Typography;
const Parents: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<{ o: boolean; data: ParentList | undefined }>({ o: false, data: undefined });
  const parentsReq: any = useQuery({
    queryKey: ['parents'],
    queryFn: () => ParentService.parentListList(),
  });

  // const deleteParents = async (id: string) => {
  //   try {
  //     await ParentService.parentDeleteNowDelete(id);
  //     message.success(t('Deleted parental data!'));
  //     parentsReq?.refetch();
  //   } catch (e: any) {
  //     message.error(e?.response?.data?.message);
  //   }
  // };

  
  const columns: ColumnsType<ParentList> = [
    {
      title: <span className="text-uppercase">№</span>,
      key: 'id',
      render: ({}, {}, index) => {
        return index + 1;
      },
    },
    // {
    //   title: <span className="text-uppercase">{t('Username')}</span>,
    //   dataIndex: 'username',
    //   key: 'username',
    //   // render: (record) => record[i18n?.language]
    // },
    {
      title: <span className="text-uppercase">{t('User phone number')}</span>,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <span className="text-uppercase">{t('Status')}</span>,
      dataIndex: 'status',
      key: 'status',
      render: (record) => record ? t("Active") : t("Disactive")
    },
    {
      title: <span className="text-uppercase">{t('Tariff name')}</span>,
      dataIndex: 'tariff_name',
      key: 'tariff_name',
      render: (record) => record  || "-"
    },
    {
      title: <span className="text-uppercase">{t('Tariff expire time')}</span>,
      dataIndex: 'tariff_expiry_time',
      key: 'tariff_expiry_time',
      render: (record) => record ? timeConverter(record):"-"
    },
    {
      title: <span className="text-uppercase">{t('Last visit')}</span>,
      dataIndex: 'last_login',
      key: 'last_login',
        render: (record) => record ? timeConverter(record):""
      // render: (record) =>
      //   new Date(record).toLocaleDateString('uz-UZ', {
      //     year: 'numeric',
      //     month: '2-digit',
      //     day: '2-digit',
      //     hour: '2-digit',
      //     minute: '2-digit',
      //   }),
    },
    // {
    //   title: <span className="text-uppercase">{t('Child code')}</span>,
    //   dataIndex: 'child_code',
    //   key: 'child_code',
    //   // render: (record) => record[i18n?.language]
    // },

    // {
    //   title: <span className="text-uppercase">{t('Profile')}</span>,
    //   dataIndex: 'profile',
    //   key: 'profile',
    //   render: () => <Button icon={<UserOutlined />} shape={'circle'} />,
    // },
    // {
    //   title: <span className="text-uppercase"> {t('Actions')} </span>,
    //   key: 'action',
    //   width: 100,
    //   render: ({}, data) => (
    //     <Space size="middle">
    //       <Button
    //         type="dashed"
    //         onClick={() => {
    //           setOpen({ o: true, data: data });
    //           form?.setFieldsValue(data);
    //         }}
    //         icon={<EditOutlined />}
    //       />
    //       <Popconfirm title={t('Delete parental data?')} onConfirm={() => deleteParents(data?.guid ?? '')}>
    //         <Button type="dashed" icon={<DeleteOutlined />} />
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <CreateOrEditParents
        refetch={() => parentsReq?.refetch()}
        open={open.o}
        data={open.data}
        setOpen={() => setOpen({ o: false, data: undefined })}
        form={form}
      />
      <TitleCard titleName={t('Table of parents')} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <CreateUpdatePartner refetch={refetch} /> */}

        {/* <Title level={4}>{t("Table of parents")}</Title> */}
        {/* <Button type="primary" onClick={() => setOpen({ o: true, data: undefined })}>+ {t("Add")}</Button> */}
      </div>
      <Card>
        <Table
          columns={columns}
          bordered={false}
          dataSource={parentsReq?.data?.results}
          loading={parentsReq?.isLoading}
          // rowKey="id"
          scroll={{ x: 1400 }}
          size="small"
        />
      </Card>
    </>
  );
};

export default Parents;
