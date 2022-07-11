import React from 'react';
import { INotification } from '../../../../types/user';
import { faBell, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

interface props {
  notification: INotification;
  close: () => void;
}

const Notification = ({ notification, close }: props) => {
  const router = useRouter();
  const UpdatedInvoiceText = () => {
    const invoiceNotif = notification.text.split(' ');
    const invoiceNotifRest = invoiceNotif
      .slice(2, invoiceNotif.length - 1)
      .join(' ');
    const invoiceStatus = invoiceNotif[invoiceNotif.length - 1];
    const link = () => {
      return router.push(`/dashboard/invoices/invoice?q=${invoiceNotif[1]}`);
    };
    return (
      <p
        onClick={() => {
          close();
          link();
        }}
      >
        {
          <span className="highlight">
            {invoiceNotif[0]} {invoiceNotif[1]}
          </span>
        }{' '}
        {`${invoiceNotifRest}`}{' '}
        {
          <span className={invoiceStatus === 'paid' ? 'paid' : 'unpaid'}>
            {invoiceStatus}
          </span>
        }
      </p>
    );
  };

  const icon = () => {
    switch (notification.type) {
      case 'invoice':
        return <FontAwesomeIcon className="icon" icon={faReceipt} />;
      default:
        return <FontAwesomeIcon className="icon" icon={faBell} />;
    }
  };

  return (
    <div className="notification-item">
      {notification.read ? '' : <div className="alert" />}
      <h2>
        {icon()} {notification.title}
      </h2>
      <UpdatedInvoiceText />
    </div>
  );
};

export default Notification;
