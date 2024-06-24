import {  Districts, Main, Operators, Partners,Parents, Regions,Children,Payme,Dashboard,PaymentToPartner } from 'pages';
import { routeType } from './types';
import { HomeFilled } from '@ant-design/icons';
import { InProggressPage } from '@components/proccess';



export const routes: Array<routeType> = [
  {
    name: 'Home',
    path: '/',
    element: Dashboard,
    icon: { name: 'main' },
    config: {
      key: 'main_page',
      isShowInMenu: true,
    },
    children: [],
  },
  {
    name: 'Users',
    path: '/users',
    element: InProggressPage,
    icon: {},
    config: {
      key: 'main_page',
      // isLabel: true,
      isShowInMenu: true,
    },
    children: [
      {
        name: 'Partners',
        path: '/partners',
        element: Partners,
        icon: { name: 'hamkor' },
        config: {
          key: 'partners_page',
          isShowInMenu: true,
        },
        children: [],
      },
      // {
      //   name: 'Agents',
      //   path: '/agents',
      //   element: Agents,
      //   icon: { name: 'agent' },
      //   config: {
      //     key: 'agents_page',
      //     isShowInMenu: true,
      //   },
      //   children: [],
      // },
      {
        name: 'Parents',
        path: '/parents',
        element: Parents,
        icon: { name: 'ota_ona' },
        config: {
          key: 'agents_page',
          isShowInMenu: true,
        },
        children: [],
      },
      {
        name: 'Children',
        path: '/children',
        element: Children,
        icon: { name: 'bola' },
        config: {
          key: 'agents_page',
          isShowInMenu: true,
        },
        children: [],
      },
      {
        name: 'Operators',
        path: '/operators',
        element: Operators,
        icon: { name: 'main' },
        config: {
          key: 'operators_page',
          isShowInMenu: true,
        },
        children: [],
      },
    ],
  },
  // {
  //   name: 'Others',
  //   path: '/other',
  //   element: InProggressPage,
  //   icon: {},
  //   config: {
  //     key: 'main_page',
  //     // isLabel: true,
  //     isShowInMenu: true,
  //   },
  //   children: [
  //     {
  //       name: 'Operators',
  //       path: '/operators',
  //       element: Operators,
  //       icon: { name: 'main' },
  //       config: {
  //         key: 'operators_page',
  //         isShowInMenu: true,
  //       },
  //       children: [],
  //     },
  //   ],
  // },
  {
    name: 'Address',
    path: '/address',
    element: Main,
    icon: { component: HomeFilled },
    config: {
      key: 'address_page',
      isShowInMenu: false,
    },
    children: [
      {
        name: 'Regions',
        path: '/regions',
        element: Regions,
        icon: { component: HomeFilled },
        config: {
          key: 'regions_page',
          isShowInMenu: true,
        },
        children: [],
      },
      {
        name: 'Districts',
        path: '/districts',
        element: Districts,
        icon: { component: HomeFilled },
        config: {
          key: 'districts_page',
          isShowInMenu: true,
        },
        children: [],
      },
    ],
  },
  {
    name: 'Payment types',
    path: '/payment',
    element: InProggressPage,
    icon: { },
    config: {
      key: 'main_page',
      // isLabel: true,
      isShowInMenu: true,
    },
    children: [
      {
        name: 'Payme',
        path: '/payme',
        element: Payme,
        icon: { name: 'payme' },
        config: {
          key: 'payme_page',
          isShowInMenu: true,
        },
        children: [],
      },
      {
        name: 'Paynet',
        path: '/paynet',
        element: InProggressPage,
        icon: { name: 'paynet' },
        config: {
          key: 'paynet_page',
          isShowInMenu: true,
        },
        children: [],
      },
    ],
  },
  {
    name: 'Payment to partner',
    path: '/payment',
    element: PaymentToPartner,
    icon: { },
    config: {
      key: 'main_page',
      // isLabel: true,
      isShowInMenu: true,
    },
    children: [
      {
        name: 'Payments',
        path: '/paymentToPartner',
        element: PaymentToPartner,
        icon: { name: 'payment' },
        config: {
          key: 'payment_page',
          isShowInMenu: true,
        },
        children: [],
      },
  
    ],
  },

];
