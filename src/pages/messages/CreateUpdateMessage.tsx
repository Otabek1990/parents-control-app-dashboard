import { PlusOutlined } from '@ant-design/icons';
import { ACCESS_TOKEN } from '@config/constants';

import { Button, Col, Form, Input, Modal, Row } from 'antd';
import axios from 'axios';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

const CreateUpdateMessage = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
 
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

  const onFinish = async (values: any) => {
  
    try {
      await axios.post('https://production.bosstrackergroup.uz/api/v1/parent/dialog-news-for-all-parents/', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button type={'primary'} size={'large'} icon={<PlusOutlined />} onClick={showModal}>
        {t('Send message')}
      </Button>
      <Modal open={open} title={t('Send message')} onCancel={handleCancel} width={1000} footer={null}>
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
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Description')}
                name="description"
              >
                <Input type="text" className="text-capitalize" placeholder={t('Description')} size="large" />
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
                {t('Send message')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUpdateMessage;
