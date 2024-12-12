import { EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { I18N_LANGUAGE } from '@config/constants';
import { timeConverter } from '@utils/timeConverter';
import { Button, Card, Descriptions, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OperatorDetail, OperatorService } from 'services/openapi';

type Props = {
  id?: string | number;
};
const OperatorInformation = ({ id }: Props) => {
  const [operator, setOperator] = useState<OperatorDetail>();
  const [open, setOpen] = useState(false);
   const language = localStorage.getItem(I18N_LANGUAGE) || 'uz';
   const { t } = useTranslation();

  const handleOpen = async () => {
    setOpen(true);
    try {
      let res = await OperatorService.operatorDetailNowRead(id as (string | number));
      setOperator(res);
    } catch (e: any) {
      errorHandler(e?.body);
    }
  };


  const handleClose = () => {
    setOpen(false);
   
  };
  type Language = 'uz' | 'ru' | 'en';
  const isLanguage = (key: string): key is Language => {
    return ['uz', 'ru', 'en'].includes(key);
  };
 
  return (
    <>
      <Button type="dashed" size="middle" icon={<EyeOutlined className="mr-0" />} onClick={handleOpen} />
      <Modal
        open={open}
        onCancel={handleClose}
        okButtonProps={{ style: { display: 'none' } }}
       
        width={1000}
      >
          <Typography.Title level={3} style={{ marginBottom: '15px', textAlign: 'center' }}>
          {t('Operator infos')}
        </Typography.Title>
        <Card style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}>
          <Descriptions column={1} style={{ marginTop: 20 }}>
            <Descriptions.Item label={t('Phone number')}>{operator?.username || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('F.I.O')}>{operator?.fullname}</Descriptions.Item>
          
            <Descriptions.Item label={t('Passport date')}>{operator?.passport_date || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('Passport seria')}>{operator?.passport_seria || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('Passport number')}>{operator?.passport_number || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('Region name')}>
              {operator && operator.region && isLanguage(language) ? operator.region.name[language] : '-'}
            </Descriptions.Item>
            <Descriptions.Item label={t('District name')}>
              {operator && operator.district && isLanguage(language) ? operator.district.name[language] : '-'}
            </Descriptions.Item>
            <Descriptions.Item label={t('Daily call limit')}>{operator?.daily_call_limit}</Descriptions.Item>
            <Descriptions.Item label={t('Created Time')}>{timeConverter(operator?.created_at || '')}</Descriptions.Item>
          </Descriptions>
        </Card>
        
     
      </Modal>
    </>
  );
};

export default OperatorInformation;
