import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { genders } from '@assets/data';
import { errorHandler } from '@config/axios_config';
import { UseQueryResult } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Radio, Row, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactInputMask from 'react-input-mask';
import { BaseApiService, OperatorService } from 'services/openapi';
import { IDistrict, IRegion } from 'types';

type Props = {
  id?: string | number | undefined;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};
const CreateUpdateOperator = ({ id, refetch }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const { t } = useTranslation();

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
        let res = await OperatorService.operatorDetailNowRead(id);
        form.setFieldsValue({
          ...res,
        });
        getDistricts(res?.region?.id);
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

  // const formatDate = 'DD.MM.YYYY';

  // const onChangeBirthdayPicker: DatePickerProps['onChange'] = (_, dateString) => {
  //   form.setFieldsValue({
  //     birthday: dayjs(dateString, formatDate),
  //   });
  // };
  // const onChangePasswordPicker: DatePickerProps['onChange'] = (_, dateString) => {
  //   form.setFieldsValue({
  //     passport_data: dayjs(dateString, formatDate),
  //   });
  // };

  const onFinish = async (values: any) => {
    setLoading(true);

    const formDat = new FormData();

    // for (const [key, value] of Object.entries(values)) {
    //   formDat.append(key, value);
    // }
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === 'string' || value instanceof Blob) {
        formDat.append(key, value);
      } else {
        formDat.append(key, String(value));
        // console.error(`Invalid value for key "${key}":`, value);
      }
    }
    // for (let [key, value] of formDat.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      const res: any = await (id
        ? OperatorService.operatorUpdateNowUpdate(id as string | number, formDat)
        : OperatorService.operatorCreateCreate(formDat));
      form.resetFields();
      message.success(res.message);

      setOpen(false);

      refetch({ throwOnError: true });
    } catch (e: any) {
      console.log(e?.body?.message);

      if (e?.body?.message?.includes('password')) {
        errorHandler(t('Password must be at least 8 characters long!'));
      }
      if (e?.body?.message?.startsWith('duplicate key value')) {
        errorHandler(t('Such a phone number operator already exists!'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        disabled={id ? true : false}
        type={id ? 'dashed' : 'primary'}
        size={id ? 'middle' : 'large'}
        icon={id ? <EditOutlined /> : <PlusOutlined />}
        onClick={showModal}
      >
        {id ? t('Edit operator') : t('Create operator')}
      </Button>
      <Modal
        open={open}
        title={id ? t('Edit operator') : t('Create operator')}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <Form className="mt-4" form={form} requiredMark={false} onFinish={onFinish} layout="vertical">
          <Row gutter={8}>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Phone number')}
                name="username"
              >
                <Input type="tel" placeholder={t('Phone number')} size="large" />
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

            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={'Passport seria'}
                name="passport_seria"
              >
                <ReactInputMask placeholder="Passport seria" className="text-uppercase" mask="aa">
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
                name="passport_date"
              >
                <input
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '0.5px solid rgba(0,0,0,0.12)',
                  }}
                  type="date"
                  name="passport_data"
                  onChange={(e) => console.log(e.target.value)}
                  defaultValue={form?.getFieldsValue(['passport_date'])}
                />
              </Form.Item>
              {/* <Form.Item
                rules={[{ message: 'Please fill the field!', required: true }]}
                label={'Passport date'}
                name="passport_date"
              >
                <DatePicker
                  className="w-100"
                  placeholder="01.01.2000"
                  onChange={onChangePasswordPicker}
                  size="large"
                  format={formatDate}
                  defaultValue={id ? dayjs(form.getFieldsValue(['passport_data']), formatDate) : undefined}
                />
              </Form.Item> */}
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
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Daily call limit')}
                name="daily_call_limit"
              >
                <Input type="number" placeholder={t('Daily call limit')} size="large" />
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
                {t('Save')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUpdateOperator;
