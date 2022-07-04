import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INotification } from "../../../../types/user";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Loading from "../../global/loading";
import Notification from "./notification";
import { useNotifications } from "../../../hooks/useNotifications";

interface props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  parentRef?: React.RefObject<HTMLDivElement>;
  data: INotification[] | null;
  loading: boolean;
}

const NotificationsDropdown = ({
  isOpen,
  setIsOpen,
  parentRef,
  data,
  loading,
}: props) => {
  const notifRef = useRef(null);
  const handleClickOutside = () => {
    setIsOpen(!isOpen);
  };
  useClickOutside(notifRef, handleClickOutside, parentRef);
  const { markAllAsRead } = useNotifications();
  const notificationRead = data?.every((value) => value.read);

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
          <button
            onClick={markAllAsRead}
            disabled={loading && notificationRead}
            className={`read ${loading || notificationRead ? "disabledButton" : ""}`}
          >
            Mark all as read
          </button>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Loading style="PulseLoader" />
            </div>
          ) : (
            <div className="notif-container">
              {data?.map((value) => {
                return <Notification key={value.id} notification={value} />;
              })}
            </div>
          )}
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default NotificationsDropdown;
