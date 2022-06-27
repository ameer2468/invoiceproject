import React, { useRef } from "react";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "./notification";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import NotificationsDropdown from "./notifications-dropdown";

const Header = () => {
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  const notifRef = useRef(null);
  useClickOutside(notifRef, handleClickOutside);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="dashboardHeader">
      <div className="container">
        <div className="searchBox">
          <input type="text" placeholder="Search..." />
          <FontAwesomeIcon
            className="icon"
            style={{ fontSize: "1.5rem" }}
            icon={faSearch}
          />
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="notification">
          <FontAwesomeIcon className="icon" icon={faBell} />
          <div className="alert" />
          <NotificationsDropdown
            isOpen={isOpen}
            setIsOpen={(active: boolean) => {
              setIsOpen(active);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
