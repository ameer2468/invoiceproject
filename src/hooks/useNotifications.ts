import { useEffect, useState } from 'react';
import { INotification } from '../../types/user';
import { getNotifications, markAllAsReadRequest } from '../services/user/user';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import { errorToast } from '../helpers';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [readLoading, setReadLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser().user;

  /*This is to mark all notifications as
  read - based on a true or null value*/

  const markAllAsRead = () => {
    setReadLoading(true);
    markAllAsReadRequest(user.attributes.sub)
      .then(() => {
        if (notifications) {
          setNotifications(
            notifications.map((notification) => {
              return {
                ...notification,
                read: true,
              };
            })
          );
        }
      })
      .catch(() => {
        toast.error('An error has occurred', errorToast);
      })
      .finally(() => {
        setReadLoading(false);
      });
  };

  const toggleNotification = (active: boolean) => {
    setIsOpen(active);
  };

  /*Call the notification endpoint and set the notifications*/

  const notificationRequest = () => {
    setLoading(true);
    getNotifications(user.attributes.sub)
      .then((res) => {
        const { data } = res;
        setNotifications(data);
        setIsOpen(true);
      })
      .catch(() => {
        toast('Failed to fetch notifications', errorToast);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /*If notification state has been set to true, make a request
   * and fetch the notifications */

  useEffect(() => {
    if (isOpen) {
      notificationRequest();
    }
  }, [isOpen]);

  return {
    notifications,
    notificationRequest,
    loading,
    markAllAsRead,
    readLoading,
    isOpen,
    toggleNotification,
    setIsOpen,
  };
};
