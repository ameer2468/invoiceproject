import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../hooks/useClickOutside";
import { motion } from "framer-motion";
import { anim } from "../../framer";

interface props {
  options: string[];
  onSelect: (option: string) => void;
  style?: React.CSSProperties;
  defaultValue?: string;
}

const Dropdown = ({ options, onSelect, style, defaultValue }: props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(defaultValue || options[0]);
  const dropdownRef = useRef(null);
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useClickOutside(dropdownRef, handleClickOutside);
  const clickHandler = (option: string) => {
    setActiveOption(option);
    onSelect(option);
  };

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="dropdown">
      <div style={style} className="main">
        <p>{activeOption}</p>
        <FontAwesomeIcon
          className={`icon ${isOpen ? "flipCaret" : ""}`}
          icon={faCaretDown}
        />
      </div>
      {isOpen && (
        <motion.div
          initial={anim.initial}
          animate={anim.animate}
          ref={dropdownRef}
          className="menu"
        >
          {options.map((option: string, index: number) => {
            return (
              <div key={index.toString()}>
                {activeOption === option ? (
                  ""
                ) : (
                  <div onClick={() => clickHandler(option)}>
                    <p>{option}</p>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
