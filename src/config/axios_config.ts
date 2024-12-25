// import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import { ACCESS_TOKEN, API_URL } from './constants';

const instance = axios.create();
instance.defaults.baseURL = API_URL;

const onRequestSuccess = (config: any) => {
  // config.headers["lang"] = localStorage.getItem(I18N_LANGUAGE) ?? "uz";
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// export const errorHandler = (err: Record<string, any>) => {
//   let error = err.response?.data || err;
//   let output = '';
//   for (const key in error) {
//     output += `${Array.isArray(error[key]) ? key + ': ' + error[key].join(', ') : error[key]}\n`;
//   }
//   return message.error('Xatolik sababi: ' + output);
// };
export const errorHandler = (err: Record<string, any> | string) => {
  let output = '';

  if (typeof err === 'string') {
    // Agar `err` string bo'lsa, to'g'ridan-to'g'ri ishlating
    output = err;
  } else {
    // Agar `err` Record bo'lsa, uni tahlil qiling
    const error = err.response?.data || err;
    for (const key in error) {
      output += `${Array.isArray(error[key]) ? key + ': ' + error[key].join(', ') : error[key]}\n`;
    }
  }

  // return message.error('Xatolik sababi: ' + output);
};

const onRequestError = (config: AxiosError) => {
  errorHandler(config);

  return Promise.reject(config);
};

const onResponseSuccess = (config: any) => {
  return config;
};

const onResponseError = (config: any) => {
  errorHandler(config);
  return Promise.reject(config);
};

instance.interceptors.request.use(onRequestSuccess, onRequestError);
instance.interceptors.response.use(onResponseSuccess, onResponseError);

export default instance;
