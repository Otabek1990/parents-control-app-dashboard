import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { UseQueryResult } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { BannerCreate } from 'services/openapi/models/BannerCreate';
import { BannerService } from 'services/openapi/services/BannerService';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  id?: string | number | undefined;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};

const CreateUpdateBanner = ({ id, refetch }: Props) => {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    video: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
      e.target.name === 'photo'
        ? setImagePreview(URL.createObjectURL(e.target.files[0]))
        : setVideoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
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

  const onFinish = async (values: BannerCreate) => {
    // console.log(values);
    const formdata = new FormData();

    formdata.append('title', values.title);
    formdata.append('description', values.description);
    formdata.append('url', values.url);
    if (formData.photo) {
      formdata.append('photo', formData.photo);
    }
    if (formData.video) {
      formdata.append('video', formData.video);
    }
    console.log('salom');
    setLoading(true);
    try {
      const res: any = await BannerService.bannerCreate(formdata);
      form.resetFields();
      message.success(res.message);
      setOpen(false);
      setImagePreview(null)
      setVideoPreview(null)
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
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Description')}
                name="description"
              >
                <Input type="text" className="text-capitalize" placeholder={t('Description')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item rules={[{ message: t('Please fill the field'), required: true }]} label={t('Url')} name="url">
                <Input className="text-capitalize" placeholder={t('Url')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              {/* <Form.Item rules={[{ message: t('Please upload Photo'), required: false }]} name="photo"> */}
              <label style={{ marginBottom: '15px' }} className="custom-file-upload" htmlFor="photo">
                {t('Upload Photo')}
              </label>
              <Input
                onChange={handlePhotoChange}
                type="file"
                name="photo"
                id="photo"
                style={{ display: 'none' }}
                size="large"
                accept="image/*"
              />
              {imagePreview && (
                <div>
                  <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                </div>
              )}
            </Col>
            <Col md={8}>
              {/* <Form.Item rules={[{ message: t('Please upload Photo'), required: false }]} name="photo"> */}
              <label style={{ marginBottom: '15px' }} className="custom-file-upload" htmlFor="video">
                {t('Upload Video')}
              </label>
              <Input
                onChange={handlePhotoChange}
                type="file"
                name="video"
                id="video"
                style={{ display: 'none' }}
                size="large"
                accept="video/*"
              />
              {videoPreview && (
                <div>
                  <video controls src={videoPreview} style={{ maxWidth: '300px', marginTop: '10px' }}></video>
                </div>
              )}
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
