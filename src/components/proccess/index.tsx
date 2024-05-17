import Lottie from 'lottie-react';
import ProcessPage from '@assets/animated-illusions/404-page.json';
import './style.scss';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const InProggressPage = () => {
  const { t } = useTranslation();

  return (
    <div className="proccess-page">
      <div className="animation-json">
        <Result
          style={{ paddingTop: 0 }}
          title={t('Page not found')}
          subTitle={t('The page is not available or is being rendered!')}
          icon={<Lottie animationData={ProcessPage} loop={true}></Lottie>}
          extra={
            <Link to="/" className="btn btn-primary py-1">
              {t('Back home')}
            </Link>
          }
        />
      </div>
    </div>
  );
};
