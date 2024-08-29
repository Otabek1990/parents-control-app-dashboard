import { Login } from 'pages';
import './App.css';
import { useAuthStore } from './store/authStore';
import RenderRoutes from './routes/renderRoutes';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import instance from '@config/axios_config';
import { ACCESS_TOKEN } from '@config/constants';
import Loading from '@components/core/Loading';

function App() {
  const store: any = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      (async () => {
        try {
          setLoading(true);
          await instance({
            method: 'get',
            url: '/v1/admin-panel-auth/me/',

          });
          if (store?.setAuth({ isAuth: true, role: 'ADMIN' })) setLoading(false);
        } catch (e: any) {
          store?.setAuth({ isAuth: false, role: '' });
          localStorage.removeItem(ACCESS_TOKEN);
          message.error(e?.response?.data?.message);
          setLoading(false);
        }
      })();
    }


  }, []);

  return loading ? <Loading/>: store?.isAuth ? <RenderRoutes /> : <Login />;
}

export default App;
