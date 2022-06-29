import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Notification from "./notification";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  parentRef?: React.RefObject<HTMLDivElement>;
}

const NotificationsDropdown = ({ isOpen, setIsOpen, parentRef }: props) => {
  const notifRef = useRef(null);
  const handleClickOutside = () => {
    setIsOpen(!isOpen);
  };
  useClickOutside(notifRef, handleClickOutside, parentRef);
  const notifArray = () => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(<Notification key={i} />);
    }
    return arr;
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          ref={notifRef}
          className="notification-drop"
        >
          <button className="read">Mark all as read</button>
          {notifArray()}
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default NotificationsDropdown;
