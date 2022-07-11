import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INotification } from '../../../../types/user';
import { useClickOutside } from '../../../hooks/useClickOutside';
import Notification from './notification';
import Scrollbars from 'react-custom-scrollbars-2';
import ButtonSkeleton from '../../skeletons/button';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationSkeleton from '../../skeletons/notification';

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
  const NotificationSkeletonArray = () => {
    let array: JSX.Element[] = [];
    for (let i = 0; i < 4; i++) {
      array.push(<NotificationSkeleton key={i} />);
    }
    return array;
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
          <div className="top">
            <p>
              <FontAwesomeIcon
                style={{ marginRight: '0.5rem' }}
                icon={faNewspaper}
              />
              Notifications
            </p>
            <p className="new">
              New updates: {data?.filter((value) => value.read === null).length}
            </p>
          </div>
          <div className="notif-container">
            <Scrollbars style={{ height: '30rem' }}>
              {loading
                ? NotificationSkeletonArray()
                : data
                    ?.sort((a, b) => Number(a.read) - Number(b.read))
                    .map((value) => {
                      return (
                        <Notification
                          close={() => setIsOpen(false)}
                          notification={value}
                          key={value.id}
                        />
                      );
                    })}
            </Scrollbars>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <ButtonSkeleton />
            </div>
          ) : (
            <button
              onClick={markAllAsRead}
              disabled={loading || notificationRead}
              className={`read ${
                loading || notificationRead ? 'disabledButton' : ''
              }`}
            >
              Mark all as read
            </button>
          )}
        </motion.div>
      ) : (
        ''
      )}
    </AnimatePresence>
  );
};

export default NotificationsDropdown;
