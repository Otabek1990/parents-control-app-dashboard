import { EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { Button, Card, Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { AgentDetail, AgentService } from 'services/openapi';

type Props = {
  id?: string;
};
const AgentInformation = ({ id }: Props) => {
  const [agent, setAgent] = useState<AgentDetail>({});
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    try {
      let res = await AgentService.agentDetailNowRead(id);
      setAgent(res);
    } catch (e: any) {
      errorHandler(e?.body);
    }
  };

  console.log('agent', agent);

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
        title={'Agent haqida malumot'}
        width={1000}
      >
        <Row>
          <Col span={12}>{agent.name}</Col>
        </Row>
      </Modal>
    </>
  );
};

export default AgentInformation;
