import {
  deleteRequest,
  getRequest,
  getUnauthenticatedRequest,
  postRequest,
  putRequest,
} from '../types';
import { IInvoice } from '../../../types/invoice';

/*Get an individual invoicer*/

export const getInvoice = (id: string) => {
  return getUnauthenticatedRequest('invoice', { id: id });
};

/*Create an invoice*/

export const createInvoice = (invoice: IInvoice) => {
  return postRequest('invoice', invoice);
};

export interface mutateInvoice {
  id: string;
  field: string;
  value: string | number | undefined;
  user_subid: string;
}

/*Update an individual invoice*/

export const mutateInvoice = (data: mutateInvoice) => {
  return putRequest('invoice', data);
};

/*Delete an individual invoice*/

export const deleteInvoice = (id: string) => {
  return deleteRequest('invoice', { id: id });
};

/*Get invoices*/

export const getInvoices = (
  status: 'paid' | 'unpaid',
  user: string,
  timeperiod?: string
) => {
  return getRequest('invoices', { from: user, status, timeperiod });
};

/*Get all invoices*/

export const getAllInvoices = (user: string) => {
  return getUnauthenticatedRequest('invoices', { from: user });
};
