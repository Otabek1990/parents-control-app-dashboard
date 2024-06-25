import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { genders } from '@assets/data';
import { errorHandler } from '@config/axios_config';
// import { UseBaseQueryResult } from '@tanstack/react-query';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  message,
} from 'antd';
import { useState } from 'react';
import { AgentCreate, AgentService, BaseApiService, PartnerList, PartnerService } from 'services/openapi';
import { IDistrict, IRegion } from 'types';
import ReactInputMask from 'react-input-mask';
import dayjs from 'dayjs';
import { UseQueryResult } from '@tanstack/react-query';
import { t } from 'i18next';

type Props = {
  id?: string | number | undefined;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};

const CreateUpdateAgent = ({ id, refetch }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [percentage, setPercentage] = useState<boolean>(true);
  const [partners, setPartners] = useState<PartnerList[]>([]);

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

  const getPartners = async () => {
    try {
      let part = await PartnerService.partnerListList();
      setPartners(part?.results);
    } catch (error: any) {
      errorHandler(error?.body);
    }
  };

  const showModal = async () => {
    setOpen(true);
    getLegions();
    getPartners();
    if (id) {
      try {
        let res = await AgentService.agentDetailNowRead(id);
        if (res.percentage_of_work !== null) {
          setPercentage(true);
        } else {
          setPercentage(false);
        }
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

  const onFinish = async (values: AgentCreate) => {
    setLoading(true);
    try {
      values['birthday'] = dayjs(values.birthday).format(formatDate);
      values['passport_data'] = dayjs(values.passport_data).format(formatDate);
      const res: any = await (id
        ? AgentService.agentUpdateNowUpdate(id as string, values)
        : AgentService.agentCreateCreate(values));
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

  const handleChangeSwitch = (checked: boolean) => {
    setPercentage(checked);
  };

  return (
    <>
      <Button
        type={id ? 'dashed' : 'primary'}
        size={id ? 'middle' : 'large'}
        icon={id ? <EditOutlined />:  <PlusOutlined /> }
        onClick={showModal}
      >
        {id ? "": t('Create agent')}
     
      </Button>
      <Modal
        open={open}
        title={id ? t("Edit agent") : t('Create agent')}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
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
                <Input className="text-capitalize" placeholder={t('Middle name')} size="large" />
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
                  placeholder="01.01.2000"
                  onChange={onChangeBirthdayPicker}
                  size="large"
                  format={formatDate}
                  defaultValue={id ? dayjs(form.getFieldsValue(['birthday']), formatDate) : undefined}
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Partner')}
                name="partner"
              >
                {/* <Input placeholder="Partner" size="large" /> */}
                <Select
                  size="large"
                  showSearch
                  placeholder={t('Select a partner')}
                  optionFilterProp="children"
                  onChange={onChangeRegion}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={partners.map((el) => {
                    return {
                      value: el.id,
                      label: el.fullname,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                className="label-with-full"
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <span>{percentage ? t('Work percentage') : t('Money for each child')}</span>
                    <Switch
                      className="ms-2"
                      checkedChildren="Percentage"
                      unCheckedChildren="For a unit"
                      checked={percentage}
                      onChange={handleChangeSwitch}
                    />
                  </div>
                }
                name={percentage ? 'percentage_of_work' : 'money_for_each_child'}
              >
                <Input placeholder={percentage ? t('Work percentage') : t('Money for each child')} size="large" />
              </Form.Item>
            </Col>
            {/* <Col md={8} className=""> */}
            {/* <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={'Percentage of work'}
                name=""
              >
                <Input placeholder="" size="large" />
              </Form.Item> */}
            {/* </Col> */}
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('Passport seria')}
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
                <ReactInputMask placeholder={t('Passport number')} className="text-uppercase" mask="9999999">
                  <Input placeholder="Passport number" size="large" />
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
                  placeholder="01.01.2000"
                  onChange={onChangePasswordPicker}
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
                {t('Cancel')}{' '}
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

export default CreateUpdateAgent;


