import { Button, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  icon?: JSX.Element;
  btnTitle?: string;
  title?: string;
  children?: JSX.Element;
  btnType?: 'link' | 'text' | 'primary' | 'dashed' | undefined;
  handleSubmit?: (e: React.MouseEvent<HTMLElement>) => void;
  userDropdown?: boolean;
};
const ConfirmModal: React.FC<Props> = ({ title, children, btnTitle, icon, btnType, handleSubmit, userDropdown }) => {
  const { t } = useTranslation();
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      content: (
        <div>
          {title}
          {children}
        </div>
      ),
      onOk: handleSubmit,
      cancelText: t('No'),
      okText: t('Yes'),
    });
  };

  return userDropdown ? (
    <a href="#/" className="menu-link px-5" onClick={showConfirm}>
      {btnTitle}
    </a>
  ) : (
    <Button type={btnType || 'default'} onClick={showConfirm} icon={icon} title={btnTitle || undefined} />
  );
};

export default ConfirmModal;
