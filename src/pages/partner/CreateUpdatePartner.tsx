import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { genders } from '@assets/data';
import { errorHandler } from '@config/axios_config';
import { UseQueryResult } from '@tanstack/react-query';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  message,
} from 'antd';
import { useState } from 'react';
import { BaseApiService, PartnerCreate, PartnerService } from 'services/openapi';
import { IDistrict, IRegion } from 'types';
import ReactInputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import uploadImageIcon from '@assets/icons/image-download.svg';
// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  id?: string | number | undefined;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};

const CreateUpdatePartner = ({ id, refetch }: Props) => {
  const [formData, setFormData] = useState({
    photo: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // -----------------------------------------
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        photo: e.target.files[0],
      });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getDistricts = async (value: number) => {
    try {
      let res: IDistrict[] = await BaseApiService.baseApiDistrictListList();
      let nweItems = res.filter((el) => el.region_id === value);
      setDistricts(nweItems);
    } catch (error: any) {
      errorHandler(error.body);
    }
  };

  const getLegions = async () => {
    try {
      let res = await BaseApiService.baseApiRegionListList();
      setRegions(res);
    } catch (error: any) {
      errorHandler(error.body);
    }
  };

  const showModal = async () => {
    setOpen(true);
    getLegions();
    if (id) {
      try {
        let res = await PartnerService.partnerDetailNowRead(id as number);
        form.setFieldsValue({
          ...res,
          birthday: dayjs(res.birthday, formatDate),
          passport_data: dayjs(res.passport_data, formatDate),
          passport_number: res.passport_number?.toString(),
        });
        getDistricts(res.region);
      } catch (e: any) {
        console.log(e?.body);
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setLoading(false);
    setDistricts([]);
    setRegions([]);
    form.resetFields();
  };

  const onChangeRegion = async (value: number) => {
    setDistricts([]);
    form.setFieldsValue({
      district: undefined,
    });
    getDistricts(value);
  };

  const formatDate = 'YYYY-MM-DD';

  const onChangeBirthdayPicker: DatePickerProps['onChange'] = (_, dateString) => {
    form.setFieldsValue({
      birthday: dayjs(dateString, formatDate),
    });
  };
  const onChangePasswordPicker: DatePickerProps['onChange'] = (_, dateString) => {
    form.setFieldsValue({
      passport_data: dayjs(dateString, formatDate),
    });
  };

  const onFinish = async (values: PartnerCreate) => {
    console.log(values);
    setLoading(true);
    console.log(formData.photo);
    const formDat = new FormData();

    formDat.append('appstore_id', values?.appstore_id);
    formDat.append('birthday', dayjs(values.birthday).format(formatDate));
    formDat.append('district', values.district.toString());
    formDat.append('download_link', values.download_link);
    formDat.append('fullname', values.fullname);
    formDat.append('gender', values.gender?.toString());
    formDat.append('google_play_link', values.google_play_link);
    formDat.append('passport_data', dayjs(values.passport_data).format(formatDate));
    formDat.append('passport_number', values.passport_number);
    formDat.append('passport_seria', values.passport_seria);
    formDat.append('password', values.password);
    formDat.append('percentage_of_work', values.percentage_of_work?.toString());
    if (formData.photo) {
      formDat.append('photo', formData.photo);
    }
    formDat.append('playstore_id', values.playstore_id);
    formDat.append('region', values.region.toString());
    formDat.append('username', values.username);
    for (let [key, value] of formDat.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      // values['birthday'] = dayjs(values.birthday).format(formatDate);
      // values['passport_data'] = dayjs(values.passport_data).format(formatDate);
      const res: any = await (id
        ? PartnerService.partnerUpdateNowUpdate(id as string | number, formDat)
        : PartnerService.partnerCreateCreate(formDat));
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
        {id ? 'Edit Partner' : t('Create partner')}
      </Button>
      <Modal
        open={open}
        // title={show ? 'Hamkor haqida malumot' : id ? "Hamkorni o'zgartirish" : 'Hamkor yaratish'}
        title={id ? t('Edit partner') : t('Create partner')}
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
                label={t('Username')}
                name="username"
              >
                <Input placeholder={t('Username')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Password')}
                name="password"
              >
                <Input placeholder={t('Password')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('FIO')}
                name="fullname"
              >
                <Input className="text-capitalize" placeholder={t('FIO')} size="large" />
              </Form.Item>
            </Col>
            {/* <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Middlename')}
                name="middle_name"
              >
                <Input className="text-capitalize" placeholder={t('Middlename')} size="large" />
              </Form.Item>
            </Col> */}
            {/* <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Surname')}
                name="surname"
              >
                <Input className="text-capitalize" placeholder={t('Surname')} size="large" />
              </Form.Item>
            </Col> */}

            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Birthday')}
                name="birthday"
              >
                <DatePicker
                  className="w-100"
                  onChange={onChangeBirthdayPicker}
                  placeholder="01.01.2000"
                  size="large"
                  format={formatDate}
                  // defaultValue={id ? dayjs(form?.getFieldsValue(['birthday']), formatDate) : undefined}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Appstore Id')}
                name="appstore_id"
              >
                <Input placeholder={t('Appstore Id')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Playstore Id')}
                name="playstore_id"
              >
                <Input placeholder={t('Playstore Id')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={'Google play link'}
                name="google_play_link"
              >
                <Input placeholder={'Google play link'} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={'Download link'}
                name="download_link"
              >
                <Input placeholder={'Download link'} size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col md={4}>
              {/* <Form.Item rules={[{ message: t('Please fill the field'), required: false }]} name="photo"> */}
              <label
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                className="custom-file-upload"
                htmlFor="photo"
              >
                <img src={uploadImageIcon} alt="upload icon" />
                <span>{t('Upload image')}</span>
              </label>
              <Input
                onChange={handlePhotoChange}
                type="file"
                name="photo"
                id="photo"
                style={{ display: 'none' }}
                size="large"
              />
              {imagePreview && (
                <div>
                  <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100px', marginTop: '5px' }} />
                </div>
              )}
              {/* </Form.Item> */}
            </Col>
            <Col md={4}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={'Passport seria'}
                name="passport_seria"
              >
                <ReactInputMask placeholder="Passport" className="text-uppercase" mask="aa">
                  <Input placeholder="Passport seria" size="large" />
                </ReactInputMask>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Passport number')}
                name="passport_number"
              >
                <ReactInputMask placeholder="Passport number" className="text-uppercase" mask="9999999">
                  <Input placeholder={t('Passport number')} size="large" />
                </ReactInputMask>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Passport date')}
                name="passport_data"
              >
                <DatePicker
                  className="w-100"
                  onChange={onChangePasswordPicker}
                  placeholder="01.01.2000"
                  size="large"
                  format={formatDate}
                  // defaultValue={id ? dayjs(form.getFieldsValue(['passport_data']), formatDate) : undefined}
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Work percentage')}
                name="percentage_of_work"
              >
                <InputNumber type='number' controls={false} placeholder={t('Work percentage')} size="large" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Regions')}
                name="region"
              >
                <Select
                  size="large"
                  showSearch
                  placeholder={t('Select a region')}
                  optionFilterProp="children"
                  onChange={onChangeRegion}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={regions.map((el) => {
                    return {
                      value: el.id,
                      label: el.name.uz,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Districts')}
                name="district"
              >
                {/* <Input placeholder="district" size="large" /> */}
                <Select
                  size="large"
                  showSearch
                  placeholder={t('Select a district')}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={districts.map((el) => {
                    return {
                      value: el.id,
                      label: el.name.uz,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Gender')}
                name="gender"
              >
                <Radio.Group size="large" optionType="button" buttonStyle="solid">
                  {genders.map((el) => (
                    <Radio key={el.value} value={el.value}>
                      {t(`${el.label}`)}
                    </Radio>
                  ))}
                </Radio.Group>
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

export default CreateUpdatePartner;
