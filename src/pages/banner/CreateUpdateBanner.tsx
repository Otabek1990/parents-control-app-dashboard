import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, Select, message } from 'antd';
import { useState } from 'react';
import { PartnerService, PaymentToPartnerService } from 'services/openapi';

import { useTranslation } from 'react-i18next';

import { PaymentToPartnerCreate } from 'services/openapi/models/PaymentToPartnerCreate';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  id?: string | number | undefined;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};

const CreateUpdateBanner = ({ id, refetch }: Props) => {
  // -----------------------------------------
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { data: partners } = useQuery({
    queryKey: ['partners'],
    queryFn: () => PartnerService.partnerListList(),
  });

  const showModal = async () => {
    setOpen(true);
    if (id) {
      try {
        let res = await PaymentToPartnerService.paymentToPartnerDetail(id as number);
        form.setFieldsValue({
          ...res,
          company_partner: res?.partner_id,
          amount: res?.amount,
          currency: res?.currency,
        });
      } catch (e: any) {
        console.log(e?.body);
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setLoading(false);
    form.resetFields();
  };

  const onFinish = async (values: PaymentToPartnerCreate) => {
    console.log(values);
    setLoading(true);
    try {
      const res: any = await (id
        ? PaymentToPartnerService.paymentToPartnerUpdate(id as number, values)
        : PaymentToPartnerService.paymentToPartnerCreate(values));
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
        {id ? '' : t('Create banner')}
      </Button>
      <Modal
        open={open}
        // title={show ? 'Hamkor haqida malumot' : id ? "Hamkorni o'zgartirish" : 'Hamkor yaratish'}
        title={id ? t('Edit banner') : t('Create banner')}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        {/* <Form className="mt-4" disabled={show} form={form} requiredMark={false} onFinish={onFinish} layout="vertical"> */}
        <Form className="mt-4" form={form} requiredMark={false} onFinish={onFinish} layout="vertical">
          <Row gutter={8}>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Title')}
                name="title"
              >
                <Input className="text-capitalize" placeholder={t('Title')} size="large" />
               
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Description')}
                name="description"
              >
                <Input type='text' className="text-capitalize" placeholder={t('Description')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Url')}
                name="url"
              >
                <Input className="text-capitalize" placeholder={t('Url')} size="large" />
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

export default CreateUpdateBanner;
