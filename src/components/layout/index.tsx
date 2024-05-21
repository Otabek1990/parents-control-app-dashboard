import { useEffect, useState } from "react";
import { Layout, Menu, Button, theme, Rate, Dropdown, Avatar, notification, Popover, List, Tag, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
// import { usePermissions } from "@hooks/usePermissions";
import CustomComponent from "../../routes/custom_component";
import { routeType } from "../../routes/types";
import "./index.scss";
import { IconComponent } from "@components/custom_icons/iconComponent";
import donIcon from "../../assets/images/load_app_img.svg";
import rectangle from "../../assets/icons/grid-rectangle.svg";
import circle from "../../assets/icons/grid-circle.svg";
import nofiy from "../../assets/icons/notification_5.svg";
import { ACCESS_TOKEN, USERNAME } from "@config/constants";
import { useAuthStore } from "../../store/authStore";
import Language from "@components/layout/header/language";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Header, Sider, Content } = Layout;

const notData = [
  {
    username: "jhon_doe",
    type: "Yillik",
    prise: 125,
    deadline: 254
  },
  {
    username: "anvar",
    type: "Oylik",
    prise: 25,
    deadline: 9
  },
  {
    username: "abdulaziz",
    type: "Kunlik",
    prise: 5,
    deadline: 1
  },
]

const LayoutCustom = ({ children }: any) => {
  const { t } = useTranslation();
  const store: any = useAuthStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  // const { checkPermission } = usePermissions();
  const [collapsed] = useState(false);
  const [fulled, setFulled] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const username=localStorage.getItem(USERNAME)
  useEffect(() => {
    if(location.pathname === "/"){
      setOpenKeys(["/users"]);
    } else {
      const path = routes.find(e => !!e?.children?.find(a => a?.path === location.pathname))?.path;
      if(path)
        setOpenKeys([path])
    }
  },[]);

  const getChildren = (item: routeType) => {
    // let routeTypes = item.children.filter((child) => checkPermission(child.config.key) && child.config.isShowInMenu);
    let routeTypes=item.children
    return routeTypes.length
      ? routeTypes.map((child) => ({
          key: child.path,
          label: t(child.name),
          className: "sidebar-menu-part-item",
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

  // ---- fullscreen ------
  let fullscreen = document.querySelector('body');

  const fullScreen = () => {
    document.onfullscreenchange = () => setFulled(!fulled);

    if (!document.fullscreenElement) {
      fullscreen?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
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
    notification.success({ message: 'Successfully', description: 'Muvaffaqiyatli tizimdan chiqildi' });
  };
// console.log( "path", location.pathname, openKeys);

  return (
    <Layout>
      <Sider
        theme="light"
        className="px-3 border sidebar-wrapper"
        style={{ minHeight: '100vh' }}
        width={280}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical">
          <span className="sidebar-logo-cls">Bosstracker</span>
        </div>
        <Menu
          style={{ border: 'none' }}
          theme="light"
          // mode="vertical"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={routes
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
                  className: item.children?.length ? "sidebar-menu-part-label" : "sidebar-menu-part-item",
                  style: {color: index == 0 ? "#377DFF" : ""},
                  icon: item.icon?.component ? (
                    <CustomComponent component={item.icon?.component} />
                  ) : item?.icon?.name ? (
                    <IconComponent style={{}} type={item?.icon?.name} />
                  ) : (
                    ""
                  ),
                  onClick: () => {
                    if (!(item.children?.length && getChildren(item)?.length)) {
                      navigate(item.path);
                    }
                  },
                  children: item.children?.length ? getChildren(item) : undefined
                };
            })}
        />
        <div style={{ backgroundColor: ' #FAFBFC' }} className="d-flex justify-content-center flex-column px-0 py-5">
          <img height={'100%'} width={239} src={donIcon} alt="" />
          <div className="d-flex justify-content-center pt-3">
            <Button style={{ borderRadius: "14px", fontSize: "15px", height: "48px", width: "200px" }} type="primary">
              {t("Download the program")}
            </Button>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="d-flex justify-content-between">
            <div className="d-flex px-3">
              <div style={{ fontSize: '25px', fontWeight: '600', color: '#4E5D78' }} className="pe-3">
                4.3
              </div>
              <div style={{ lineHeight: '20px' }} className="d-flex flex-column pt-2">
                <div>
                  <Rate allowHalf defaultValue={4.3} />
                </div>
                <div style={{ color: '#8A94A6' }}>119 {t("comment")} - 192 {t("ball")}</div>
              </div>
            </div>
            <div className="d-flex justify-content-evenly">
              {/*<div className="d-flex justify-content-evenly header-period-cls mt-3">*/}
              {/*  <div>Oy</div>*/}
              {/*  <div>Yil</div>*/}
              {/*  <div className="active-item">3 Yil</div>*/}
              {/*</div>*/}
              <Language />
              <div className="mx-2" style={{ cursor: "pointer" }} onClick={fullScreen} >
                {!fulled ? <img width={25} src={rectangle} alt="" />
                  : <img width={25} src={circle} alt="" />}
              </div>
              <div className="px-2">
                <Popover
                  title={t("Notification")}
                  content={
                    <List
                      size="small"
                      header={null}
                      footer={null}
                      dataSource={notData}
                      renderItem={(item: any) => <List.Item>
                        <div className="w-100">
                          <div className="w-100 d-flex justify-content-between" >
                            <b>{item?.username}:</b>&nbsp;&nbsp;<Tag color={ item?.deadline > 10 ? "blue" : item?.deadline > 5 ? "orange" : "red"} className="border-0" >{item?.deadline} kun qoldi</Tag>
                          </div>
                          <div>
                            {item?.type} - ${item?.prise}

                          </div>
                        </div>
                      </List.Item>}
                    />
                  }
                  trigger="click"
                >
                  <img width={25} src={nofiy} alt="" style={{ cursor: "pointer" }} />
                </Popover>
              </div>
              <div className="px-2 pt-1">
                <span style={{ borderRadius: '15px', width: '100px' }} className="bg-success text-light px-3 py-1">
                  34
                </span>
              </div>
              <Dropdown
                trigger={['click']}
                placement={'bottomRight'}
                menu={{
                  items: [
                    {
                      label: t("Personal information"),
                      key: "personal_info",
                      icon: <UserOutlined />,
                      onClick: () => {
                        // logOut();
                      },
                    },
                    {
                      label: t("Change password"),
                      key: "set_password",
                      icon: <SettingOutlined />,
                      onClick: () => {
                        // logOut();
                      },
                    },
                    {
                      label: t("Logout"),
                      key: "logout",
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
                    <div style={{ fontSize: '12px' }}>{store.role}</div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          {/*<Button*/}
          {/*  type="text"*/}
          {/*  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
          {/*  onClick={() => setCollapsed(!collapsed)}*/}
          {/*  style={{*/}
          {/*    fontSize: "16px",*/}
          {/*    width: 64,*/}
          {/*    height: 64*/}
          {/*  }}*/}
          {/*/>*/}
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutCustom;
