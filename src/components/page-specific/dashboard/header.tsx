import React, { useRef } from "react";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationsDropdown from "./notifications-dropdown";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
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
        <div ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="notification">
          <FontAwesomeIcon className="icon" icon={faBell} />
          <div className="alert" />
        </div>
        <NotificationsDropdown
          isOpen={isOpen}
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
