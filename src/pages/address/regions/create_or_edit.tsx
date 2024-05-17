import { Button, Form, Input, Modal, Switch } from 'antd';
import { FC, useState } from 'react';
// import { Region } from "services/openapi";
type Props = {
  data: any;
  refetch: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  form: any;
};

const CreateOrEditRegion: FC<Props> = ({ data, open, setOpen, form, refetch }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (values: { title: string; is_active: boolean }) => {
    console.log(values);
    refetch();
  };

  return (
    <>
      <Modal
        open={open}
        title={data ? 'Viloyatni tahrirlash!' : 'Viloyat yaratish!'}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item rules={[{ required: true, message: "Maydonni to'ldiring" }]} name="title" label="Viloyat nomi">
            <Input placeholder="Viloyat nomi" />
          </Form.Item>
          <Form.Item name="is_active" label="Holati" valuePropName="checked">
            <Switch />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="button" danger>
              Bekor qilish
            </Button>
            <Button type="primary" danger className="mx-1">
              Tozalash
            </Button>
            <Button loading={loading} type="primary" htmlType="submit">
              Saqlash
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateOrEditRegion;
