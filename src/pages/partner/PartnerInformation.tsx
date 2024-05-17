import { EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { PartnerDetail, PartnerService } from 'services/openapi';

type Props = {
  id?: string;
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

  console.log('partner', partner);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="dashed" size="middle" icon={<EyeOutlined className="mr-0" />} onClick={handleOpen} />
      <Modal
        open={open}
        onCancel={handleClose}
        okButtonProps={{ style: { display: 'none' } }}
        title={'Hamkor haqida malumot'}
        width={1000}
      >
        Info
      </Modal>
    </>
  );
};

export default PartnerInformation;
