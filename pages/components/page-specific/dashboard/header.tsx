import React from 'react';
import {faSearch, faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <div className="dashboardHeader">
            <div className="container">
                <div className="searchBox">
                    <input type="text" placeholder="Search..." />
                    <FontAwesomeIcon
                        className="icon"
                        style={{fontSize: "1.5rem"}}
                        icon={faSearch}/>
                </div>
                <div className="notification">
                    <FontAwesomeIcon className="icon" icon={faBell}/>
                </div>
            </div>
        </div>
    );
};

export default Header;
