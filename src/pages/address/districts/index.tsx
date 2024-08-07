import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getRegionList } from "@pages/address/service";
import { ColumnsType } from "antd/es/table";
import { Card, Table, Typography } from "antd";
import { BaseApiService } from "services/openapi";

const { Title } = Typography;
const Districts: FC = (): JSX.Element => {
  const { i18n, t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  // const [form] = Form.useForm();
  // const [modal, setModal] = useState<{ open: boolean, data: Region | null }>({open: false, data: null});
  const regionResp: any = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegionList({})
  });

  const districtResp: any = useQuery({
    queryKey: ["district"],
    queryFn: () => BaseApiService.baseApiDistrictListList()
  });

  // @ts-ignore
  const columns: ColumnsType<Region> = [
    {
      title: <span className="text-uppercase">№</span>,
      key: "id",
      render: ({}, {}, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: <span className="text-uppercase">{t("District name")}</span>,
      dataIndex: "name",
      key: "name",
      render: (record) => record[i18n.language]
    },
    {
      title: <span className="text-uppercase">{t("Region name")}</span>,
      dataIndex: "region_id",
      key: "region_id",
      render: (record) => {
        console.log(record);
        return regionResp?.data?.find((item: any) => item?.id === record)?.name[i18n?.language];
      }
    }
  ];

  return (
    <>
      {/*<CreateOrEditRegion refetch={refetch} form={form} open={modal.open} setOpen={() => {*/}
      {/*    form.resetFields();*/}
      {/*    setModal({open: false, data: null});*/}
      {/*}}*/}
      {/*                    data={modal.data}/>*/}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Title level={4}>{t("Districts")}</Title>
        {/*<Button type="primary" onClick={() => setModal({open: true, data: null})}>+ Qo'shish</Button>*/}
      </div>
      <Card>
        <Table
           pagination={{
            pageSize: 10,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
          columns={columns}
          bordered={false}
          dataSource={districtResp?.data}
          loading={districtResp?.isLoading}
          rowKey="id"
          // scroll={{ x: 768 }}
          size="small"
        />
       
      </Card>
    </>
  );
};

export default Districts;
