import { FC, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, message, Row, Space, Spin, Tooltip } from 'antd';
import Lottie from 'lottie-react';
import instance from '@config/axios_config';
import { ACCESS_TOKEN } from '@config/constants';
import animatedCircles from '@assets/loaders/loader-three-circle.json';
import typingPassword from '@assets/loaders/typing-password.json';
import './login.scss';
import '../../index.css';
import { useAuthStore } from 'store/authStore';
import { OpenAPI } from 'services/openapi';
import userIcon from "@assets/icons/username-icon.svg"
import userPassword from "@assets/icons/password.svg"
import Language from "@components/layout/header/language";
import { useTranslation } from 'react-i18next';

const Login: FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s: any) => s.setAuth);
  const {t} = useTranslation();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);

    try {
      const resp = await instance.post('/v1/base-api/login/', values);
      const data = resp.data;
      if (data.success) {
        setAuth({ isAuth: true, role: data.role });
        localStorage.setItem(ACCESS_TOKEN, data.access);
        OpenAPI.TOKEN = data.access;
      } else {
        throw new Error('Error logging in');
      }
    } catch (error: any) {
      message.info('Xatolik kodi: ' + error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space className="login-section" direction="vertical">
      <Spin
        style={{ height: '100vh', position: 'absolute', top: '25%' }}
        spinning={loading}
        indicator={
          <div className="indicator-container">
            <span className='circle-json'>
              <Lottie animationData={animatedCircles} loop={true}></Lottie>
            </span>
          </div>
        }
      >
        <Row className={'login-row'}>
          <Col xs={24} sm={24} md={24} lg={12} className="left-side">
            <Row>
              <Col>
                <Lottie animationData={typingPassword} loop={loading}></Lottie>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <div className="d-flex justify-content-end px-5 py-3"><Language/></div>
            <Row className="right-side">
              <Col xs={18} sm={18} lg={16} xl={12}>
                <h2 className="text-center">{t("Bosstracker Admin")}</h2>
                <p>{t("Welcome ! Please enter your information")}.</p>
                <Form onFinish={onFinish} layout="vertical">
                  <Form.Item
                    // rules={[{ message: 'Please fill the field!', required: true }]}
                    className="custom-label"
                    label={t('Username')}
                    name="username"
                  >
                    <Input suffix={<img src={userIcon} />} allowClear placeholder={t("Enter your username")} size="large" />
                  </Form.Item>
                  <Form.Item
                    // rules={[{ message: 'Please fill the field!', required: true }]}
                    className="custom-label"
                    label={t('Password')}
                    name="password"
                  >
                    <Input.Password suffix={
                      <span>
                        <img src={userPassword} alt="Password Icon" />
                      </span>
                    } allowClear placeholder={t("Enter your existing system password")} size="large" />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
                    <div className={'d-flex justify-content-between align-items-center w-100'}>
                      <Checkbox className="w-50">{t("Save password")}</Checkbox>
                      <Tooltip title={t("This option is not available yet")} className="w-50">
                        <Button type="link">{t("Password reset")}</Button>
                      </Tooltip>
                    </div>
                  </Form.Item>
                  <div className="d-flex justify-content-end">
                    <Button type="primary" htmlType="submit" size="large">
                      {t("Login")}
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Space>
  );
};

export default Login;
