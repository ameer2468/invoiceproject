import React, { useRef } from "react";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationsDropdown from "./notifications-dropdown";
import { useNotifications } from "../../../hooks/useNotifications";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { notifications, notificationRequest, loading, markAllAsRead } =
    useNotifications();
  const buttonRef = useRef(null);

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
        <div
          ref={buttonRef}
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              notificationRequest();
            }
          }}
          className="notification"
        >
          <FontAwesomeIcon className="icon" icon={faBell} />
          {notifications?.every((value) => value.read) ? "" : <div className="alert" />}
        </div>
        <NotificationsDropdown
          isOpen={isOpen}
          markAllAsRead={markAllAsRead}
          loading={loading}
          data={notifications}
          parentRef={buttonRef}
          setIsOpen={(active: boolean) => {
            setIsOpen(active);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
