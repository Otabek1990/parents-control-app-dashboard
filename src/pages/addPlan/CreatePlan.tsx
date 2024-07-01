import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { UseQueryResult } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { PlanService } from 'services/openapi/services/PlanService';
import { PlanCreate } from 'services/openapi/models/PlanCreate';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  id?: string | number | undefined;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};

const CreatePlan = ({ id, refetch }: Props) => {
  // -----------------------------------------
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();


  const showModal = async () => {
    setOpen(true);
  
  };

  const handleCancel = () => {
    setOpen(false);
    setLoading(false);
    form.resetFields();
  };

  const onFinish = async (values: PlanCreate) => {
    console.log(values);
    setLoading(true);
    try {
      const res: any = await (
        PlanService.planCreate(values)
      )
      form.resetFields();
      message.success(res.message);
      setOpen(false);
      refetch({ throwOnError: true });
    } catch (e: any) {
      errorHandler(e?.body);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type={id ? 'dashed' : 'primary'}
        size={id ? 'middle' : 'large'}
        icon={id ? <EditOutlined /> : <PlusOutlined />}
        onClick={showModal}
      >
        {id ? '' : t('Add plan')}
      </Button>
      <Modal
        open={open}
        // title={show ? 'Hamkor haqida malumot' : id ? "Hamkorni o'zgartirish" : 'Hamkor yaratish'}
        title={id ? t('Edit plan') : t('Create plan')}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        {/* <Form className="mt-4" disabled={show} form={form} requiredMark={false} onFinish={onFinish} layout="vertical"> */}
        <Form className="mt-4" form={form} requiredMark={false} onFinish={onFinish} layout="vertical">
          <Row gutter={8}>
            <Col md={12}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Total days')}
                name="total_days"
              >
                <Input type='number' className="text-capitalize" placeholder={t('Total days')} size="large" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Total clients')}
                name="total_clients"
              >
                <Input type="number" className="text-capitalize" placeholder={t('Total clients')} size="large" />
              </Form.Item>
            </Col>
         
          </Row>

          <Row key="footer" gutter={16}>
            <Col span="12">
              <Button size="large" className="w-100" onClick={handleCancel}>
                {t('Cancel')}
              </Button>
            </Col>

            <Col span="12">
              <Button size="large" htmlType="submit" className="w-100" type="primary" loading={loading}>
                {id ? t('Edit') : t('Save')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePlan;
