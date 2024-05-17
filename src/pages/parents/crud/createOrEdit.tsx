import { FC, useState } from "react";
import { ParentList } from "../../../services/openapi";
import { Button, Form, Input, message, Modal } from "antd";
import instance from "@config/axios_config";

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: ParentList | undefined;
  form: any;
  refetch: () => void;
}

const CreateOrEditParents: FC<PropsType> = ({ form, open, setOpen, data, refetch }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (data && data.guid) {
        await instance({
          method: "PUT",
          url: `/v1/parent/update/${data?.guid}/now/`,
          data: values
        });
      } else {
        await instance({
          method: "POST",
          url: "/v1/parent/create/",
          data: values
        });
      }

      message.success("Saqlandi!");
      setOpen(false);
      form?.resetFields();
      refetch();
    } catch (e: any) {
      console.log(e);
      let errors: any = Object?.entries(e?.response?.data).map(([k, v]) => {
        return {
          name: [k],
          errors: v,
          validate: false
        };
      });
      console.log(errors);
      form?.setFields(errors);
    } finally {
      setLoading(false);
    }
  };
  return <Modal open={open} onCancel={() => {
    form?.resetFields();
    setOpen(false);
  }} footer={false}
                title={data ? "Ota ona ma'lumotlarini tahrirlash!" : "Ota ona ma'lumotlarini kiritish!"}>
    <Form autoComplete={"new-password"} layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: "Maydonni to'ldiring!" }]}>
        <Input allowClear placeholder={"Username"} />
      </Form.Item>
      <Form.Item label="Parol" name="password" rules={[{ required: true, message: "Maydonni to'ldiring!" }]}>
        <Input.Password allowClear autoComplete={"new-password"} placeholder={"Parol"} />
      </Form.Item>
      <div className="d-flex justify-content-between pt-3">
        <div className={"w-50 pe-2"}>
          <Button className="w-100" htmlType="button" onClick={() => {
            form?.resetFields();
            setOpen(false);
          }}>Bekor qilish</Button>
        </div>
        <div className={"w-50 ps-1"}>
          <Button loading={loading} className="w-100" type="primary" htmlType="submit">Saqlash</Button>
        </div>
      </div>
    </Form>
  </Modal>;
};

export default CreateOrEditParents;