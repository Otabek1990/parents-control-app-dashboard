import main from "../../assets/icons/apps01.svg";
import hamkor from "../../assets/icons/briefcase04.svg";
import agent from "../../assets/icons/video.svg";
import ota_ona from "../../assets/icons/users.svg";
import bola from "../../assets/icons/accessibility_nocolor.png";
import payme from "../../assets/icons/Payme.svg";
import paynet from "../../assets/icons/Paynet.svg";
import payment from "../../assets/icons/payment.svg";
import click from "../../assets/icons/click.png";

export const IconComponent = ({ type, style }: { type: "main" | "hamkor" | "agent" | "ota_ona" | "bola" | "payme" | "paynet" | "payment" | "click", style?: any }) => {
  // console.log(type,style);
  switch (type) {
    case "main":
      return <span style={style?{ ...style }:{width:"5px"}}>
      <img width="25px" style={{paddingRight:"5px"}} src={main} alt="" />
    </span>;

    case "hamkor":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={hamkor} alt="" />
    </span>;

    case "agent":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={agent} alt="" />
    </span>;

    case "ota_ona":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={ota_ona} alt="" />
    </span>;
    case "bola":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={bola} alt="" />
    </span>;

    case "payme":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={payme} alt="" />
    </span>;

    case "paynet":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={paynet} alt="" />
    </span>;
    case "payment":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={payment} alt="" />
    </span>;
    case "click":
      return <span style={style?{ ...style }:{}}>
      <img width="25px" style={{paddingRight:"5px"}} src={click} alt="" />
    </span>;

    default: return <span>none</span>
  }
};