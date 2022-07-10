import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INotification } from "../../../../types/user";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Loading from "../../global/loading";
import Notification from "./notification";
import Scrollbars from "react-custom-scrollbars-2";

interface props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  parentRef?: React.RefObject<HTMLDivElement>;
  data: INotification[] | null;
  loading: boolean;
  markAllAsRead: () => void;
}

const NotificationsDropdown = ({
  isOpen,
  setIsOpen,
  parentRef,
  data,
  markAllAsRead,
  loading,
}: props) => {
  const notifRef = useRef(null);
  const handleClickOutside = () => {
    setIsOpen(!isOpen);
  };
  useClickOutside(notifRef, handleClickOutside, parentRef);
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
            disabled={loading || notificationRead}
            className={`read ${loading || notificationRead ? "disabledButton" : ""}`}
          >
            {loading ? <Loading style="PulseLoader" /> : "Mark all as read"}
          </button>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Loading style="PulseLoader" />
            </div>
          ) : (
            <div className="notif-container">
              <Scrollbars style={{ height: "30rem" }}>
                {data
                  ?.sort((a, b) => Number(a.read) - Number(b.read))
                  .map((value) => {
                    return (
                      <Notification
                        close={() => setIsOpen(false)}
                        key={value.id}
                        notification={value}
                      />
                    );
                  })}
              </Scrollbars>
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
