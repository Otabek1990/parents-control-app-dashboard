import { EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { Button, Modal, Card,  Descriptions, Typography } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { PartnerDetail, PartnerService } from 'services/openapi';
import { timeConverter } from '@utils/timeConverter';

type Props = {
  id?: string | undefined | number;
};
const PartnerInformation = ({ id }: Props) => {
  const [partner, setPartner] = useState<PartnerDetail>();
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    try {
      let res = await PartnerService.partnerDetailNowRead(id as string);
      setPartner(res);
    } catch (e: any) {
      errorHandler(e?.body);
    }
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="dashed" size="middle" icon={<EyeOutlined className="mr-0" />} onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} okButtonProps={{ style: { display: 'none' } }} width={1000}>

        <Typography.Title level={3} style={{ marginBottom: '15px', textAlign: 'center' }}>
          {t('Partner infos')}
        </Typography.Title>
        <Card
          style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}
        
        >
          <Descriptions  column={1} style={{ marginTop: 20 }}>
            <Descriptions.Item label={t('Username')} >{partner?.username || "-"}</Descriptions.Item>
            <Descriptions.Item label={t('F.I.O')} >{partner?.fullname}</Descriptions.Item>
            {/* <Descriptions.Item label={t('Name')}>{partner?.name}</Descriptions.Item>
            <Descriptions.Item label={t('Surname')}>{partner?.surname}</Descriptions.Item>
            <Descriptions.Item label={t('Middlename')}>{partner?.middle_name}</Descriptions.Item> */}
            <Descriptions.Item label={t('Birthday')}>{partner?.birthday || "-"}</Descriptions.Item>
     
            <Descriptions.Item label={t("Work percentage")}>{partner?.percentage_of_work} %</Descriptions.Item>
            <Descriptions.Item label={"Google play link"}>{partner?.google_play_link || "-"} </Descriptions.Item>
            <Descriptions.Item label={t("Appstore Id")}>{partner?.appstore_id || "-"} </Descriptions.Item>
            <Descriptions.Item label={t("Playstore Id")}>{partner?.playstore_id || "-"} </Descriptions.Item>
            <Descriptions.Item label={t("Passport date")}>{partner?.passport_data || "-"}</Descriptions.Item>
            <Descriptions.Item label={t("Passport seria")}>{partner?.passport_seria || "-"}</Descriptions.Item>
            <Descriptions.Item label={t("Passport number")}>{partner?.passport_number || "-"}</Descriptions.Item>
            <Descriptions.Item label={t("Created Time")}>{timeConverter(partner?.created_at || "")}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Modal>
    </>
  );
};

export default PartnerInformation;
