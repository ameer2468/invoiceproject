import {getRequest} from "../types";

/*Get all invoices of the user*/

export const getInvoices = () => {
    return getRequest('invoices', {from :'ameer'},)
}

