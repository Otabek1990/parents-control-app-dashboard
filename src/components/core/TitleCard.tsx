import { Typography } from 'antd';
import { t } from 'i18next';
// import DatePickerComponent from './DatePickerComponent';
import { type ReactNode } from 'react';

type TitleCardProps = {
  titleName: string;
  children?: ReactNode;
};

function TitleCard({ titleName, children }: TitleCardProps) {
  const { Title } = Typography;
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <Title style={{whiteSpace:"nowrap"}} level={4}>{t(titleName)}</Title>
      <div className="d-flex align-items-center gap-3">
        {/* <DatePickerComponent />
        <DatePickerComponent /> */}
        {children}
      </div>
    </div>
  );
}

export default TitleCard;
