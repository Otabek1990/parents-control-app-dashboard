import React, { FC } from "react";
import { Button, Dropdown } from "antd";
import { I18N_LANGUAGE } from "@config/constants";
import uzIcon from "../../../assets/icons/uz.png";
import ruIcon from "../../../assets/icons/ru.png";
import enIcon from "../../../assets/icons/en.png";
import i18next from "../../../locales/i18n";
import { useTranslation } from "react-i18next";

const Language: FC = (): JSX.Element => {
  const {i18n}=useTranslation()
  const menuItems = [
    {
      label: "O'zbekcha", key: "uz", onClick: () => changeLanguage("uz"), icon: React.createElement("img", {
        src: uzIcon
      })
    },
    {
      label: "Русский", key: "ru", onClick: () => changeLanguage("ru"), icon: React.createElement("img", {
        src: ruIcon
      })
    },
    {
      label: "English", key: "en", onClick: () => changeLanguage("en"), icon: React.createElement("img", {
        src: enIcon
      })
    }
  ];

  // console.log(i18next);
  const changeLanguage = (lang: string) => {
    console.log(lang);
    i18next.changeLanguage(lang, (e, t:any) => {
      console.log(e,t());
    });
    localStorage.setItem(I18N_LANGUAGE, lang);
  };

  return <div>
    <Dropdown trigger={["click"]} menu={{ items: menuItems }}>
      <Button><span>{menuItems?.find(item => item?.key === i18n?.language)?.icon}<span
        className="ms-1">{menuItems?.find(item => item?.key === i18n?.language)?.label}</span></span></Button>
    </Dropdown>
  </div>;
};

export default Language;