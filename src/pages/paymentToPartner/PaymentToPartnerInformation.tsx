import { EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { Button, Modal, Card, Descriptions, Typography } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import {  PaymentToPartnerService } from 'services/openapi';

import { PaymentToPartnerDetail } from 'services/openapi/models/PaymentToPartnerDetail';
import Loading from '@components/core/Loading';

type Props = {
  id?: string | undefined | number;
};
const PaymentToPartnerInformation = ({ id }: Props) => {
  const [payment, setPayment] = useState<PaymentToPartnerDetail>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    try {
      let res = await PaymentToPartnerService.paymentToPartnerDetail(id as number);
      setPayment(res);
      setLoading(false);
      setSuccess(true);
    } catch (e: any) {
      errorHandler(e?.body);
      setLoading(false);
      setSuccess(false);
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
          {t('Payment infos')}
        </Typography.Title>

        <Card style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}>
          {loading && <Loading />}
          {!loading && success && (
            <>
              <Descriptions column={1} style={{ marginTop: 20 }}>
                <Descriptions.Item label={t('Partner')}>{payment?.company_partner || '-'}</Descriptions.Item>
                <Descriptions.Item label={t('Money amount')}>{payment?.amount}</Descriptions.Item>

                <Descriptions.Item label={t('Currency')}>{payment?.currency || '-'}</Descriptions.Item>
                {/* <Descriptions.Item label={t('Created Time')}>{timeConverter(payment?.created_at || '')}</Descriptions.Item> */}
              </Descriptions>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default PaymentToPartnerInformation;
