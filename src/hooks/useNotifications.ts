import { useState } from "react";
import { INotification } from "../../types/user";
import { getNotifications, markAllAsReadRequest } from "../services/user/user";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";
import { errorToast } from "../helpers";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const markAllAsRead = () => {
    setLoading(true);
    markAllAsReadRequest(user[0].attributes.sub)
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
        toast.error("An error has occurred", errorToast);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const notificationRequest = () => {
    setLoading(true);
    getNotifications(user[0].attributes.sub)
      .then((res) => {
        const { data } = res;
        setNotifications(data);
      })
      .catch(() => {
        toast("Failed to fetch notifications", errorToast);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { notifications, notificationRequest, loading, markAllAsRead };
};
