import { useEffect, useState } from 'react';
import { Layout, Menu, theme, Rate, Dropdown, Avatar, notification, MenuProps, Button, Drawer } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterRoutesByRole, routes } from '../../routes/routes';
// import { usePermissions } from "@hooks/usePermissions";
import CustomComponent from '../../routes/custom_component';
import { routeType } from '../../routes/types';
import './index.scss';
import { IconComponent } from '@components/custom_icons/iconComponent';
import donIcon from '../../assets/images/load_app_img.svg';

import { ACCESS_TOKEN, USERNAME } from '@config/constants';
import { useAuthStore } from '../../store/authStore';
import Language from '@components/layout/header/language';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
const { Header, Sider, Content } = Layout;

const LayoutCustom = ({ children }: any) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const isMobile = window.innerWidth < 767;
  const [collapsed] = useState(false); // Sidebar starts collapsed
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { t } = useTranslation();
  const store: any = useAuthStore((state) => state);
  const role = localStorage.getItem('role') || 'ADMIN';
  const handleMenuClick = (path: string) => {
    navigate(path);
    setDrawerVisible(false);
  };
  const filteredRoutes = filterRoutesByRole(routes, role);

  const location = useLocation();
  const navigate = useNavigate();
  // const { checkPermission } = usePermissions();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const username = localStorage.getItem(USERNAME);
  useEffect(() => {
    if (location.pathname === '/') {
      setOpenKeys(['/users']);
    } else {
      const path = filteredRoutes.find((e) => !!e?.children?.find((a) => a?.path === location.pathname))?.path;
      if (path) setOpenKeys([path]);
    }
  }, []);

  const getChildren = (item: routeType) => {
    // let routeTypes = item.children.filter((child) => checkPermission(child.config.key) && child.config.isShowInMenu);
    let routeTypes = item.children;
    return routeTypes?.length
      ? routeTypes.map((child) => ({
          key: child.path,
          label: t(child.name),
          className: 'sidebar-menu-part-item',
          icon: child.icon?.component ? (
            <CustomComponent component={child.icon?.component} />
          ) : child?.icon?.name ? (
            <IconComponent style={{ paddingRight: '5px' }} type={child?.icon?.name} />
          ) : (
            ''
          ),
          onClick: () => {
            navigate(child.path);
          },
        }))
      : undefined;
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  const logOut = () => {
    store?.setAuth({ isAuth: false, role: '' });
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem('role');
    notification.success({ message: 'Successfully', description: 'Muvaffaqiyatli tizimdan chiqildi' });
  };
  // console.log( "path", location.pathname, openKeys);

  return (
    <Layout>
      <Sider
        theme="light"
        className="px-3 border sidebar-wrapper"
        style={{ minHeight: '100vh', display: isMobile ? 'none' : 'block' }}
        width={280}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {!isMobile && (
          <div className="demo-logo-vertical">
            <span className="sidebar-logo-cls">Anor</span>
          </div>
        )}
        <Menu
          style={{ border: 'none' }}
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={filteredRoutes
            // ?.filter((item) => checkPermission(item.config.key) && item.config.isShowInMenu)
            .map((item, index) => {
              return item?.config?.isLabel
                ? {
                    key: `label-${index}`,
                    label: t(item.name),
                    className: 'sidebar-menu-part-label',
                    disabled: true,
                  }
                : {
                    key: `${item.path}`,
                    label: t(item.name),
                    className: item.children?.length ? 'sidebar-menu-part-label' : 'sidebar-menu-part-item',
                    style: { color: index == 0 ? '#377DFF' : '' },
                    icon: item.icon?.component ? (
                      <CustomComponent component={item.icon?.component} />
                    ) : item?.icon?.name ? (
                      <IconComponent style={{}} type={item?.icon?.name} />
                    ) : (
                      ''
                    ),
                    onClick: () => {
                      if (!(item.children?.length && getChildren(item)?.length)) {
                        navigate(item.path);
                      }
                    },
                    children: item.children?.length ? getChildren(item) : undefined,
                  };
            })}
        />
        <div style={{ backgroundColor: ' #FAFBFC' }} className="d-flex justify-content-center flex-column px-0 py-5">
          <img height={'100%'} width={239} src={donIcon} alt="" />
        </div>
      </Sider>
      <Layout >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="d-flex  justify-content-between">
            {!isMobile && (
              <div className="d-flex px-3">
                <div style={{ fontSize: '25px', fontWeight: '600', color: '#4E5D78' }} className="pe-3">
                  0
                </div>
                <div style={{ lineHeight: '20px' }} className="d-flex flex-column pt-2">
                  <div>
                    <Rate allowHalf defaultValue={0} />
                  </div>
                  <div style={{ color: '#8A94A6' }}>
                    0 {t('comment')} - 0 {t('ball')}
                  </div>
                </div>
              </div>
            )}
            {isMobile && (
              <div style={{display:"flex",alignItems:"center",gap:"3px"}}>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setDrawerVisible(true)}
                  style={{
                    fontSize: '16px',
                    width: 40,
                    height: 40,
                  }}
                />
                <span className="sidebar-logo-cls">Anor</span>
              </div>
            )}

            <div className="d-flex gap-2 justify-content-evenly">
              <Language />

              <Dropdown
                trigger={['click']}
                placement={'bottomRight'}
                menu={{
                  items: [
                    {
                      label: t('Personal information'),
                      key: 'personal_info',
                      icon: <UserOutlined />,
                      onClick: () => {
                        // logOut();
                      },
                    },
                    {
                      label: t('Change password'),
                      key: 'set_password',
                      icon: <SettingOutlined />,
                      onClick: () => {
                        // logOut();
                      },
                    },
                    {
                      label: t('Logout'),
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      onClick: () => {
                        logOut();
                      },
                    },
                  ],
                }}
              >
                <div style={{ cursor: 'pointer' }} className="d-flex align-items-center">
                  <div className="pe-1">
                    <Avatar>{username?.charAt(0)}</Avatar>
                  </div>
                  <div className="d-flex flex-column pt-1 me-4" style={{ lineHeight: '15px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600 }} className="pt-0">
                      {username}
                    </div>
                    <div style={{ fontSize: '12px' }}>{role} </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: isMobile ? 12 :24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
      <Drawer
        title={
          <div className="demo-logo-vertical">
            <span className="sidebar-logo-cls">Anor</span>
          </div>
        }
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={'80%'}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={({ key }) => handleMenuClick(key)}
          items={filteredRoutes
            // ?.filter((item) => checkPermission(item.config.key) && item.config.isShowInMenu)
            .map((item, index) => {
              return item?.config?.isLabel
                ? {
                    key: `label-${index}`,
                    label: t(item.name),
                    className: 'sidebar-menu-part-label',
                    disabled: true,
                  }
                : {
                    key: `${item.path}`,
                    label: t(item.name),
                    className: item.children?.length ? 'sidebar-menu-part-label' : 'sidebar-menu-part-item',
                    style: { color: index == 0 ? '#377DFF' : '' },
                    icon: item.icon?.component ? (
                      <CustomComponent component={item.icon?.component} />
                    ) : item?.icon?.name ? (
                      <IconComponent style={{}} type={item?.icon?.name} />
                    ) : (
                      ''
                    ),
                    onClick: () => {
                      if (!(item.children?.length && getChildren(item)?.length)) {
                        navigate(item.path);
                      }
                    },
                    children: item.children?.length ? getChildren(item) : undefined,
                  };
            })}
        />
      </Drawer>
    </Layout>
  );
};

export default LayoutCustom;
