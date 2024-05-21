import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { OpenAPI } from 'services/openapi';
import { ACCESS_TOKEN } from '@config/constants';
import './index.css';
const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   refetchOnWindowFocus: false,
    // },
  },
});

OpenAPI.TOKEN = localStorage.getItem(ACCESS_TOKEN) || undefined;
OpenAPI.BASE = 'https://location.bosstrackergroup.uz/api/v1';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
