import { CopyOutlined, EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { Button, Modal, Card, Descriptions, Typography } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { PartnerDetail, PartnerService } from 'services/openapi';
import { timeConverter } from '@utils/timeConverter';
import { I18N_LANGUAGE } from '@config/constants';

type Props = {
  id?: string | undefined | number;
};
const PartnerInformation = ({ id }: Props) => {
  const [partner, setPartner] = useState<PartnerDetail>();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2 soniyadan keyin statusni qaytaradi
    });
  };

  const handleOpen = async () => {
    setOpen(true);
    try {
      let res = await PartnerService.partnerDetailNowRead(id as number);
      setPartner(res);
    } catch (e: any) {
      errorHandler(e?.body);
    }
  };

  const language = localStorage.getItem(I18N_LANGUAGE) || 'uz';
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
      <Modal open={open} onCancel={handleClose} okButtonProps={{ style: { display: 'none' } }} width={1000}>
        <Typography.Title level={3} style={{ marginBottom: '15px', textAlign: 'center' }}>
          {t('Partner infos')}
        </Typography.Title>
        <Card style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}>
          <Descriptions column={1} style={{ marginTop: 20 }}>
            <Descriptions.Item label={t('Username')}>{partner?.username || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('F.I.O')}>{partner?.fullname}</Descriptions.Item>
            {/* <Descriptions.Item label={t('Name')}>{partner?.name}</Descriptions.Item>
            <Descriptions.Item label={t('Surname')}>{partner?.surname}</Descriptions.Item>
            <Descriptions.Item label={t('Middlename')}>{partner?.middle_name}</Descriptions.Item> */}
            <Descriptions.Item label={t('Birthday')}>{partner?.birthday || '-'}</Descriptions.Item>

            <Descriptions.Item label={t('Work percentage')}>{partner?.percentage_of_work} %</Descriptions.Item>
            <Descriptions.Item label={'Google play link'}>
              {' '}
              <a href={partner?.google_play_link || ''} target="_blank">
                {partner?.google_play_link || ''}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label={'Download link'}>
              <a href={partner?.download_link || ''} target="_blank">
                {partner?.download_link || ''}
              </a>{' '}
              <CopyOutlined
                onClick={() => handleCopy(partner?.download_link || '')}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
              {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Copied!</span>}
            </Descriptions.Item>
            <Descriptions.Item label={t('Appstore Id')}>{partner?.appstore_id || ''} </Descriptions.Item>
            <Descriptions.Item label={t('Playstore Id')}>{partner?.playstore_id || '-'} </Descriptions.Item>
            <Descriptions.Item label={t('Passport date')}>{partner?.passport_data || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('Passport seria')}>{partner?.passport_seria || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('Passport number')}>{partner?.passport_number || '-'}</Descriptions.Item>
            <Descriptions.Item label={t('Region name')}>
              {partner && partner.region && isLanguage(language) ? partner.region.name[language] : '-'}
            </Descriptions.Item>
            <Descriptions.Item label={t('District name')}>
              {partner && partner.district && isLanguage(language) ? partner.district.name[language] : '-'}
            </Descriptions.Item>
            {/* <Descriptions.Item label={t('Gender')}>
              {(partner?.gender == '1' ? t('Man') : t('Woman')) || '-'}
            </Descriptions.Item> */}
            <Descriptions.Item label={t('Created Time')}>{timeConverter(partner?.created_at || '')}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Modal>
    </>
  );
};

export default PartnerInformation;
