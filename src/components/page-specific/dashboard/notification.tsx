import React from "react";
import { INotification } from "../../../../types/user";

interface props {
  notification: INotification;
}

const Notification = ({ notification }: props) => {
  return (
    <div className="notification-item">
      {notification.read ? "" : <div className="alert" />}
      <h2>{notification.title}</h2>
      <p>{notification.text}</p>
    </div>
  );
};

export default Notification;
