import { Login } from 'pages';
import './App.css';
import { useAuthStore } from './store/authStore';
import RenderRoutes from './routes/renderRoutes';
// import { useEffect, useState } from 'react';
// import { message } from 'antd';
// import instance from '@config/axios_config';
// import { ACCESS_TOKEN } from '@config/constants';

function App() {
  const store: any = useAuthStore((state) => state);
  // const [loading, setLoading] = useState(false);
const loading=false
  // useEffect(() => {
  //   let token = localStorage.getItem(ACCESS_TOKEN);
  //   if (token) {
  //     (async () => {
  //       try {
  //         setLoading(true);
  //         await instance({
  //           method: 'get',
  //           url: '/v1/base-api/me/',
  //         });
  //         if (store?.setAuth({ isAuth: true, role: 'ADMIN' })) setLoading(false);
  //       } catch (e: any) {
  //         store?.setAuth({ isAuth: false, role: '' });
  //         localStorage.removeItem(ACCESS_TOKEN);
  //         message.error(e?.response?.data?.message);
  //         setLoading(false);
  //       }
  //     })();
  //   }
  // }, []);

  return loading ? <></> : store?.isAuth ? <RenderRoutes /> : <Login />;
}

export default App;
