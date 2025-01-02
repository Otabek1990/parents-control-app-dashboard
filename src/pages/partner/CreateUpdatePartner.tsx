import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { genders } from '@assets/data';
import { errorHandler } from '@config/axios_config';
import { UseQueryResult } from '@tanstack/react-query';
import { Button, Col, Form, Input,  Modal, Radio, Row, Select, message } from 'antd';
import { useState } from 'react';
import { BaseApiService, PartnerService } from 'services/openapi';
import { IDistrict, IRegion } from 'types';
import ReactInputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import uploadImageIcon from '@assets/icons/image-download.svg';
// import { MonthlyPercentageService } from 'services/openapi/services/MonthlyPercentage';
// import { MonthlyPercentageData } from 'services/openapi/models/MonthlyPercentageCreate';
// import { months } from './months';
// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
// defaultValue
type Props = {
  id?: string | number | undefined;
  refetch: ({ throwOnError }: { throwOnError: boolean }) => Promise<UseQueryResult>;
};

const CreateUpdatePartner = ({ id, refetch }: Props) => {
  // const [percentages, setPercentages] = useState<MonthlyPercentageData[]>([]);
  // const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  // const [percentage, setPercentage] = useState<number>(0);
  const [formData, setFormData] = useState({
    avatar: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // -----------------------------------------
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);

  // const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedMonth(e.target.value);
  // };

  // const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPercentage(Number(e.target.value));
  // };
  // const handleAddPercentage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setPercentages((prevPercentages) => {
  //     const existingIndex = prevPercentages.findIndex((item) => item.month === selectedMonth);
  //     if (existingIndex !== -1) {
  //       // Update the existing percentage for the selected month
  //       const updatedPercentages = [...prevPercentages];
  //       updatedPercentages[existingIndex].percentage = percentage;
  //       return updatedPercentages;
  //     } else {
  //       // Add new entry
  //       return [...prevPercentages, { month: selectedMonth, percentage, partner: 1 }];
  //     }
  //   });
  // };
 
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        avatar: e.target.files[0],
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

  const getRegions = async () => {
    try {
      let res = await BaseApiService.baseApiRegionListList();
      setRegions(res);
    } catch (error: any) {
      errorHandler(error.body);
    }
  };

  const showModal = async () => {
    setOpen(true);
    getRegions();
    if (id) {
      try {
        let res = await PartnerService.partnerDetailNowRead(id as number);
        getDistricts(res?.region?.id);
        form.setFieldsValue({
          ...res,
          birthday: res?.birthday || '2000-01-01',
          passport_data: res?.passport_data || '2000-01-01',
          username: res.username,
          fullname: res.fullname,
          passport_number: res.passport_number?.toString(),
          region: res.region?.id || 1,
          district: res?.district?.id || 1,
        });
        // getDistricts(res.region?.uz);
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
    // setPercentages([])
  };

  const onChangeRegion = async (value: number) => {
    setDistricts([]);
    form.setFieldsValue({
      district: undefined,
    });
    getDistricts(value);
  };

  const formatDate = 'YYYY-MM-DD';


  const onFinish = async (values: any) => {
    console.log(values);
    setLoading(true);
   
    const formDat = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key] as any;
        if (value !== undefined && value !== null) {
          if (key === 'birthday' || key === 'passport_data') {
            formDat.append(key, dayjs(value).format(formatDate));
          } else {
            formDat.append(key, value.toString());
          }
        }
      }
    }

    if (formData.avatar) {
      formDat.append('avatar', formData.avatar);
    }
    formDat.append('playstore_id', 'uz.bosstracker.parent');
    for (let [key, value] of formDat.entries()) {
      console.log(`${key}: ${value}`);
    }


    try {
      const res: any = await (id
        ? PartnerService.partnerUpdateNowUpdate(id as string | number, formDat)
        : PartnerService.partnerCreateCreate(formDat));
      form.resetFields();
      message.success(res.message);
      console.log(res);
      setOpen(false)
      // if (!id) {
        
      //   const arr=percentages.length 
      //   ? percentages.map(item=>{
      //     return {
      //       ...item,
      //       partner:res?.user?.id
      //     }
      //   })
      //   :[]
      //   console.log(arr)
      //   try {
      //     const perRes = await MonthlyPercentageService.monthlyPercentageCreate(arr);
      //     message.success(res.message);
      //     console.log(perRes);
      //     setOpen(false);
      //   } catch (error) {
      //     alert('Ish foizi qoshishda hatolik!');
      //   }
      // }

      
      refetch({ throwOnError: true });
    } catch (e: any) {
      console.log(e?.body?.message);
      errorHandler(e?.body?.message);
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
        {id ? t('Edit partner') : t('Create partner')}
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
          <Row gutter={4}>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Username')}
                name="username"
              >
                <Input type='tel' placeholder={t('Username')} />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Phone number')}
                name="phone_number"
              >
                <Input type='tel' placeholder={t('Phone number')} />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: id ? false : true }]}
                label={t('Password')}
                name="password"
              >
                <Input  placeholder={t('Password')} />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: true }]}
                label={t('FIO')}
                name="fullname"
              >
                <Input className="text-capitalize" placeholder={t('FIO')} />
              </Form.Item>
            </Col>

            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Birthday')}
                name="birthday"
              >
                <input
                  style={{
                    width: '100%',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '0.5px solid rgba(0,0,0,0.12)',
                  }}
                  type="date"
                  name="birthday"
                  defaultValue={form?.getFieldsValue(['birthday'])}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={4}>
            <Col md={4}>
              {/* <Form.Item rules={[{ message: t('Please fill the field'), required: false }]} name="avatar"> */}
              <label
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                className="custom-file-upload"
                htmlFor="avatar"
              >
                <img src={uploadImageIcon} alt="avatar" />
                <span style={{ fontSize: '13px' }}>{t('Upload image')}</span>
              </label>
              <Input
                accept="image/*"
                onChange={handlePhotoChange}
                type="file"
                name="avatar"
                id="avatar"
                style={{ display: 'none' }}
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
                  <Input placeholder="Passport seria" />
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
                  <Input placeholder={t('Passport number')} />
                </ReactInputMask>
              </Form.Item>
            </Col>

            <Col md={8}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Passport date')}
                name="passport_data"
              >
                <input
                  style={{
                    width: '100%',
                    padding: '4px',
                    borderRadius: '5px',
                    border: '0.5px solid rgba(0,0,0,0.12)',
                  }}
                  type="date"
                  name="passport_data"
                  defaultValue={form?.getFieldsValue(['passport_data'])}
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
                <Radio.Group optionType="button" buttonStyle="solid">
                  {genders.map((el) => (
                    <Radio key={el.value} value={el.value}>
                      {t(`${el.label}`)}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            {/* <Col md={20}>
              <Form.Item
                rules={[{ message: t('Please fill the field'), required: false }]}
                label={t('Work percentage')}
              >
                <div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Input
                      type="number"
                      onChange={handlePercentageChange}
                      placeholder={t('Work percentage')}
                      style={{width:"300px"}}
                    />

                    <select
                      style={{
                        width: '300px',
                        padding: '4px',
                        borderRadius: '5px',
                        border: '0.5px solid rgba(0,0,0,0.12)',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <Button style={{width:"300px"}} type='primary' onClick={handleAddPercentage} htmlType="button">
                      {t('Add')}
                    </Button>
                  </div>
                  <ul className='percentage-list'>
                    {percentages.map(({ month, percentage }) => (
                      <li key={month}>
                        {month}: {percentage}%
                      </li>
                    ))}
                  </ul>
                </div>
              </Form.Item>
            </Col> */}
          </Row>
          <Row key="footer" gutter={16}>
            <Col span="12">
              <Button className="w-100" onClick={handleCancel}>
                {t('Cancel')}
              </Button>
            </Col>

            <Col span="12">
              <Button htmlType="submit" className="w-100" type="primary" loading={loading}>
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
