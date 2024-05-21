import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRegionList } from "@pages/address/service";
import { ColumnsType } from "antd/es/table";
import { Card, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const Regions: FC = (): JSX.Element => {
  const { i18n, t } = useTranslation();
  // const [form] = Form.useForm();
  // const [modal, setModal] = useState<{ open: boolean; data: any }>({ open: false, data: null });
  const { data, isLoading }: any = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegionList({limit: 0})
  });

  // @ts-ignore
  const columns: ColumnsType<Region> = [
    {
      title: <span className="text-uppercase">№</span>,
      key: "id",
      render: ({}, {}, index) => {
        return index + 1;
      }
    },
    {
      title: <span className="text-uppercase">{t("Region name")}</span>,
      dataIndex: "name",
      key: "name",
      render: (record) => record[i18n?.language]
    }
  ];
console.log(data)
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Title level={4}>{t("Regions")}</Title>
      </div>
      <Card>
        <Table
          columns={columns}
          bordered={false}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          // scroll={{ x: 1400 }}
          pagination={false}
          size="small"
        />
      </Card>
    </>
  );
};

export default Regions;
