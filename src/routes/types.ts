export type routeType = {
  name: string;
  path: string;
  element: any;
  icon: { component?: any; name?: 'main' | 'hamkor' | 'agent' | 'ota_ona' | 'bola' | 'payme' | 'paynet' | 'payment' };
  config: {
    key: string;
    isLabel?: boolean;
    isShowInMenu: boolean;
  };
  children: Array<routeType>;
};
