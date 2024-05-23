import { t } from 'i18next';
import { Input } from 'antd';

function InputText() {
  return (
    <div>
      <Input style={{width:"300px"}} size="large" placeholder={t('Search')} />
    </div>
  );
}

export default InputText;
