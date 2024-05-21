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

type Props = {
  id?: string;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};

const CreateUpdatePartner = ({ id, refetch }: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);

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
        let res = await PartnerService.partnerDetailNowRead(id);
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

  const formatDate = 'DD.MM.YYYY';

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
    try {
      values['birthday'] = dayjs(values.birthday).format(formatDate);
      values['passport_data'] = dayjs(values.passport_data).format(formatDate);
      const res: any = await (id
        ? PartnerService.partnerUpdateNowUpdate(id as string, values)
        : PartnerService.partnerCreateCreate(values));
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
        {id ? '' : t('Add')}
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
                label={t('Name')}
                name="name"
              >
                <Input className="text-capitalize" placeholder={t('Name')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Middlename')}
                name="middle_name"
              >
                <Input className="text-capitalize" placeholder={t('Middlename')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Surname')}
                name="surname"
              >
                <Input className="text-capitalize" placeholder={t('Surname')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Birthday')}
                name="birthday"
              >
                <DatePicker
                  className="w-100"
                  onChange={onChangeBirthdayPicker}
                  placeholder="01.01.2000"
                  size="large"
                  format={formatDate}
                  defaultValue={id ? dayjs(form.getFieldsValue(['birthday']), formatDate) : undefined}
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Appstore Id')}
                name="appstore_id"
              >
                <Input placeholder={t('Appstore Id')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Playstore Id')}
                name="playstore_id"
              >
                <Input placeholder={t('Playstore Id')} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={'Google play link'}
                name="google_play_link"
              >
                <Input placeholder={'Google play link'} size="large" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Work percentage')}
                name="percentage_of_work"
              >
                <InputNumber controls={false} placeholder={t('Work percentage')} size="large" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={'Passport seria'}
                name="passport_seria"
              >
                <ReactInputMask placeholder="Passport" className="text-uppercase" mask="aa">
                  <Input placeholder="Passport" size="large" />
                </ReactInputMask>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
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
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Passport date')}
                name="passport_data"
              >
                <DatePicker
                  className="w-100"
                  onChange={onChangePasswordPicker}
                  placeholder="01.01.2000"
                  size="large"
                  format={formatDate}
                  defaultValue={id ? dayjs(form.getFieldsValue(['passport_data']), formatDate) : undefined}
                />
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
               {id ? t('Edit') : t("Save")}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUpdatePartner;
