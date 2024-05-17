import { EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { OperatorDetail, OperatorService } from 'services/openapi';

type Props = {
  id?: string;
};
const OperatorInformation = ({ id }: Props) => {
  const [operator, setOperator] = useState<OperatorDetail>();
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    try {
      let res = await OperatorService.operatorDetailNowRead(id as string);
      setOperator(res);
    } catch (e: any) {
      errorHandler(e?.body);
    }
  };

  console.log('Operator', operator);

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
        title={'Operator haqida malumot'}
        width={1000}
      >
        Info
      </Modal>
    </>
  );
};

export default OperatorInformation;
