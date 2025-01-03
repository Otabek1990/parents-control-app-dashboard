import {
  Districts,
  Main,
  Operators,
  Partners,
  Parents,
  Regions,
  Children,
  Payme,
  Dashboard,
  PaymentToPartner,
  Banner,
  AddPlan,
  Paynet,
  Click,
  Messages,
  OperatorParents,
  ContactedParents,
  UnContactedParents
} from 'pages';
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
    roles:['ADMIN','PARTNER']
  },
  {
    name: 'Users',
    path: '/users',
    element: InProggressPage,
    icon: {},
    config: {
      key: 'users_page',
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
        roles:['ADMIN']
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
          key: 'parents_page',
          isShowInMenu: true,
        },
        children: [],
        roles:['ADMIN','PARTNER',]
      },
      {
        name: 'Children',
        path: '/children',
        element: Children,
        icon: { name: 'bola' },
        config: {
          key: 'children_page',
          isShowInMenu: true,
        },
        children: [],
        roles:['ADMIN','PARTNER']
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
        roles:['ADMIN']
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
        roles:['ADMIN']
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
        roles:['ADMIN']
      },
    ],
    roles:['ADMIN']
  },
  {
    name: 'Payment types',
    path: '/payment',
    element: InProggressPage,
    icon: {},
    config: {
      key: 'payment_type_page',
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
        roles:['ADMIN','PARTNER']
      },
      {
        name: 'Paynet',
        path: '/paynet',
        element: Paynet,
        icon: { name: 'paynet' },
        config: {
          key: 'paynet_page',
          isShowInMenu: true,
        },
        children: [],
        roles:['ADMIN','PARTNER']
      },
      {
        name: 'Click',
        path: '/click',
        element: Click,
        icon: { name: 'click' },
        config: {
          key: 'click_page',
          isShowInMenu: true,
        },
        children: [],
        roles:['ADMIN','PARTNER']
      },
    ],
    roles:['ADMIN','PARTNER']
  },
  {
    name: 'Payment to partner',
    path: '/payments',
    element: PaymentToPartner,
    icon: {},
    config: {
      key: 'payment_to_partner_page',
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
        roles:['ADMIN']
      },
    ],
    roles:['ADMIN']
  },
  {
    name: 'Others',
    path: '/others',
    element: Banner,
    icon: {},
    config: {
      key: 'others',
      // isLabel: true,
      isShowInMenu: true,
    },
    children: [
      {
        name: 'Banners',
        path: '/banner',
        element: Banner,
        icon: { name: 'main' },
        config: {
          key: 'banner',
          isShowInMenu: true,
        },
        children: [],
        roles:['ADMIN']
      },
      {
        name: 'Add plan',
        path: '/addPlan',
        element: AddPlan,
        icon: { name: 'main' },
        config: {
          key: 'addPlan',
          isShowInMenu: true,
        },
        children: [],
        roles:['ADMIN']
      },
    ],
    roles:['ADMIN']
  },
  {
    name: 'Send message to parents',
    path: '/message',
    element: Messages,
    icon: { name: 'main' },
    config: {
      key: 'message_page',
      isShowInMenu: true,
    },
    children: [],
    roles:['ADMIN']
  },
  {
    name: 'Parents',
    path: '/operatorParents',
    element: OperatorParents,
    icon: { name: 'ota_ona' },
    config: {
      key: 'operator_parents_page',
      isShowInMenu: true,
    },
    children: [],
    roles:['OPERATOR']
  },
  {
    name: 'Contacted parents',
    path: '/contactedParents',
    element: ContactedParents,
    icon: { name: 'main' },
    config: {
      key: 'contacted_parents',
      isShowInMenu: true,
    },
    children: [],
    roles:['OPERATOR']
  },
  {
    name: 'Uncontacted parents',
    path: '/uncontactedParents',
    element: UnContactedParents,
    icon: { name: 'main' },
    config: {
      key: 'uncontacted_parents',
      isShowInMenu: true,
    },
    children: [],
    roles:['OPERATOR']
  },
];
export const filterRoutesByRole = (routes: Array<routeType>, role: string): Array<routeType> => {
  return routes
    .filter(route => !route.roles || route.roles.includes(role))
    .map(route => ({
      ...route,
      children: filterRoutesByRole(route.children, role),
    }));
};