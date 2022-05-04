import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

interface props {
    placeholder?: string;
    value?: string;
}

const SearchBox = ({placeholder, value}: props) => {
    return (
        <div className="searchBox">
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                value={value}
            />
            <FontAwesomeIcon
                className="icon"
                style={{fontSize: "1.5rem"}}
                icon={faSearch}/>
        </div>
    );
};

export default SearchBox;
