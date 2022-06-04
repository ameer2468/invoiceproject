import {deleteRequest, getRequest, getUnauthenticatedRequest, putRequest} from "../types";

/*Get all invoices of the user*/

export const getPaidInvoices = () => {
    return getRequest('invoices', {from :'ameer', status: 'paid'},)
}

export const getInvoice = (id: string) => {
    return getUnauthenticatedRequest('invoice', {id: id})
}

export interface mutateInvoice {
    id: string,
    field: string,
    value: string
}

export const mutateInvoice = (data: mutateInvoice) => {
    return putRequest('invoice', data);
}

export const deleteInvoice = (id: string) => {
    return deleteRequest('invoice', {id: id});
}

export const getUnpaidInvoices = () => {
    return getRequest('invoices', {from :'ameer', status: 'unpaid'},)
}

export const getAllInvoices = () => {
    return getUnauthenticatedRequest('invoices', {from :'ameer'},)
}


