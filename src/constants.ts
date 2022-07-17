import { v4 as uuidv4 } from 'uuid';
import { faCog, faFile, faHome } from '@fortawesome/free-solid-svg-icons';

export const navLinks = [
  { name: 'Overview', href: '/dashboard/overview', icon: faHome },
  { name: 'Invoices', href: '/dashboard/invoices', icon: faFile },
  { name: 'Settings', href: '/dashboard/settings', icon: faCog },
];

export const invoiceFormState = {
  id: '',
  status: 'unpaid',
  description: '',
  date: new Date().toISOString().split('T')[0],
  duedate: null,
  to: '',
  from: '',
  account_number: '',
  sort_code: '',
  invoiceItems: [
    {
      id: uuidv4(),
      description: '',
      amount: '',
    },
  ],
  notes: '',
  tos: '',
  tax: '',
  amount: '',
};
