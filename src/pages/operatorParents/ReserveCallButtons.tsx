import { ACCESS_TOKEN, API_URL } from '@config/constants';
import { Button, notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OperatorParentsList } from 'services/openapi/services/OperatorParentService';

type ReserveCallButtonsProps = {
  parentData: OperatorParentsList;
};
function ReserveCallButtons({ parentData }: ReserveCallButtonsProps) {
  const [isReserveLoading, setIsReserveLoading] = useState(false);
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [isReserveDisabled, setIsReserveDisabled] = useState(false);
  const [isCallDisabled, setIsCallDisabled] = useState(false);
  const { t } = useTranslation();

  const handleReserveClick = async (parentId: number) => {
    setIsReserveLoading(true);
    try {
      const token = localStorage.getItem(ACCESS_TOKEN); // Bearer token olish
      const response = await axios.post(
        `${API_URL}/v1/admin-panel-operator/assign-parent/`,
        { parent_id: parentId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Tokenni so'rovga qo'shish
          },
        },
      );

      console.log(response);
      notification.success({
        message: 'Success',
        description: 'Parent successfully reserved.',
      });
      setIsReserveDisabled(true);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error',
        description: 'Failed to reserve parent.',
      });
    } finally {
      setIsReserveLoading(false);
    }
  };
  const handleCallClick = async (parentId: number) => {
    setIsCallLoading(true);
    try {
      const token = localStorage.getItem(ACCESS_TOKEN); // Bearer token olish
      const response = await axios.post(
        `${API_URL}/v1/admin-panel-operator/call-to-parent/`,
        { parent_id: parentId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Tokenni so'rovga qo'shish
          },
        },
      );
      console.log(response);
      if (response.data?.is_called) {
        notification.success({
          message: 'Success',
          description: 'Parent successfully called.',
        });
        setIsCallDisabled(true);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to call parent.',
      });
    } finally {
      setIsCallLoading(false);
    }
  };
  return (
    <>
      <Button
        size="small"
        type="primary"
        style={{
          marginInline: '8px',
          fontSize: '12px',
          backgroundColor: isReserveDisabled ? '#d9d9d9' : '#1890ff',
          borderColor: isReserveDisabled ? '#d9d9d9' : '#1890ff',
        }}
        loading={isReserveLoading}
        disabled={isReserveDisabled}
        onClick={() => handleReserveClick(parentData.id)}
      >
        {isReserveDisabled ? t('Reserved') : t('Reserve')}
      </Button>
      <Button
        style={{
          fontSize: '12px',
          backgroundColor: parentData.is_called || isCallDisabled ? '#d9d9d9' : '#52c41a',
          borderColor: parentData.is_called || isCallDisabled ? '#d9d9d9' : '#52c41a',
          color: 'white',
        }}
        loading={isCallLoading}
        disabled={parentData.is_called || isCallDisabled}
        size="small"
        type="default"
        onClick={() => handleCallClick(parentData.id)}
      >
        {parentData.is_called || isCallDisabled ? t('Called') : t('Call')}
      </Button>
    </>
  );
}

export default ReserveCallButtons;
