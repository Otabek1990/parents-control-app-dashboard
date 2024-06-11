import { EyeOutlined } from '@ant-design/icons';
import { errorHandler } from '@config/axios_config';
import { timeConverter } from '@utils/timeConverter';
import { Button, Card, Descriptions, Modal, Typography } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { AgentDetail, AgentService } from 'services/openapi';

type Props = {
  id?: string | number | undefined;
};
const AgentInformation = ({ id }: Props) => {
  const [agent, setAgent] = useState<AgentDetail>();
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    try {
      let res = await AgentService.agentDetailNowRead(id as string);
      console.log(res)
      setAgent(res);
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
      <Modal
        open={open}
        onCancel={handleClose}
        okButtonProps={{ style: { display: 'none' } }}
        title={'Agent haqida malumot'}
        width={1000}
      >
        <Typography.Title level={3} style={{ marginBottom: '15px', textAlign: 'center' }}>
          {t('Agent infos')}
        </Typography.Title>
        <Card style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}>
          <Descriptions column={1} style={{ marginTop: 20 }}>
          <Descriptions.Item label={t('Username')}>{agent?.username || "-"}</Descriptions.Item>
          <Descriptions.Item label={t('F.I.O')}>{agent?.fullname || "-" }</Descriptions.Item>
            {/* 
            <Descriptions.Item label={t('Name')}>{agent?.name}</Descriptions.Item>
            <Descriptions.Item label={t('Surname')}>{agent?.surname}</Descriptions.Item> */}
            {/* <Descriptions.Item label={t('Middlename')}>{agent?.middle_name}</Descriptions.Item> */}
            <Descriptions.Item label={t('Birthday')}>{agent?.birthday || "-"}</Descriptions.Item>
            <Descriptions.Item label={t('Partner')}>{agent?.agent_partner || "-"}</Descriptions.Item>
           
            <Descriptions.Item label={t('Work percentage')}>{agent?.percentage_of_work} %</Descriptions.Item>
            <Descriptions.Item label={t("Passport date")}>{agent?.passport_data || "-"}</Descriptions.Item>
            <Descriptions.Item label={t("Passport seria")}>{agent?.passport_seria || "-"}</Descriptions.Item>
            <Descriptions.Item label={t("Passport number")}>{agent?.passport_number || "-"}</Descriptions.Item>
            <Descriptions.Item label={t("Money for each child")}>{agent?.money_for_each_child || "-"}</Descriptions.Item>
            <Descriptions.Item label={t("Created Time")}>{timeConverter(agent?.created_at || "")}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Modal>
    </>
  );
};

export default AgentInformation;
