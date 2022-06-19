import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCog,
  faUser,
  faFile,
  faSignOutAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useLogin } from "../../../hooks/useLogin";
import Avatar from "../../global/Avatar";
import { useUser } from "../../../UserContext";

interface props {
  children?: JSX.Element;
}

const Sidebar = ({ children }: props) => {
  const router = useRouter();
  const { user } = useUser();
  const userInfo = user[0];
  const { signoutHandler } = useLogin();
  const pathCheck = (path: string) => {
    return router.pathname === path ? "active" : "";
  };
  const navLinks = [
    { name: "Overview", href: "/dashboard/overview", icon: faHome },
    { name: "Invoices", href: "/dashboard/invoices", icon: faFile },
    { name: "Reports", href: "/dashboard/reports", icon: faBook },
    { name: "Accounts", href: "/dashboard/accounts", icon: faUser },
    { name: "Settings", href: "/dashboard/settings", icon: faCog },
  ];

  return (
    <div className="sidebar">
      <div className="container">
        <Link passHref={true} href={"/"}>
          <h3>Payee.</h3>
        </Link>
        <div className="profile">
          {userInfo && (
            <Avatar
              name={userInfo.attributes["custom:firstname"]}
              color={"#121212"}
            />
          )}
          <div className="info">
            <h4>{userInfo.attributes["custom:firstname"]}</h4>
          </div>
          <div className="navlinks">
            {navLinks.map((link, index) => (
              <div
                key={index.toString()}
                className={`link ${pathCheck(link.href)}`}
              >
                <FontAwesomeIcon
                  style={{
                    color: router.pathname === link.href ? "#5f62ff" : "white",
                    width: "4rem",
                  }}
                  icon={link.icon}
                />
                <Link passHref={true} href={link.href} key={index.toString()}>
                  <p>{link.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div onClick={signoutHandler} className="logout">
          <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
