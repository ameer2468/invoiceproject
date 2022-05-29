import {getRequest} from "../types";

/*Get all invoices of the user*/

export const getPaidInvoices = () => {
    return getRequest('invoices', {from :'ameer', status: 'paid'},)
}

export const getInvoice = (id: string) => {
    return getRequest('invoice', {id: id})
}

export const getUnpaidInvoices = () => {
    return getRequest('invoices', {from :'ameer', status: 'unpaid'},)
}

export const getAllInvoices = () => {
    return getRequest('invoices', {from :'ameer'},)
}


