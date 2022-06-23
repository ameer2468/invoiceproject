import {
  deleteRequest,
  getRequest,
  getUnauthenticatedRequest,
  postRequest,
  putRequest,
} from "../types";
import { Invoice } from "../../../types/invoice";

/*Get an individual invoicer*/

export const getInvoice = (id: string) => {
  return getUnauthenticatedRequest("invoice", { id: id });
};

/*Create an invoice*/

export const createInvoice = (invoice: Invoice) => {
  return postRequest("invoice", invoice);
};

export interface mutateInvoice {
  id: string;
  field: string;
  value: string | number | undefined;
}

/*Update an individual invoice*/

export const mutateInvoice = (data: mutateInvoice) => {
  return putRequest("invoice", data);
};

/*Delete an individual invoice*/

export const deleteInvoice = (id: string) => {
  return deleteRequest("invoice", { id: id });
};

/*Get unpaid invoices*/

export const getUnpaidInvoices = (user: string) => {
  return getRequest("invoices", { from: user, status: "unpaid" });
};

/*Get all invoices of the user*/

export const getPaidInvoices = (user: string) => {
  return getRequest("invoices", { from: user, status: "paid" });
};

/*Get all invoices*/

export const getAllInvoices = (user: string) => {
  return getUnauthenticatedRequest("invoices", { from: user });
};
