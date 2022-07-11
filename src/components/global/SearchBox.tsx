import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface props {
  placeholder?: string;
  value?: string;
  onChange?: (arg: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ placeholder, value, onChange }: props) => {
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={(e) => (onChange ? onChange(e) : null)}
      />
      <FontAwesomeIcon
        className="icon"
        style={{ fontSize: '1.5rem' }}
        icon={faSearch}
      />
    </div>
  );
};

export default SearchBox;
