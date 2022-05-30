import {Invoice} from "../../types/invoice";
import {useState, ChangeEvent} from "react";
import {deleteInvoice, mutateInvoice} from "../services/invoices/services";

export const useInvoice = () => {

    const [mutateLoading, setMutateLoading] = useState(false);
    const [invoiceForm, setInvoiceForm] = useState<Invoice>({
        id: '',
        status: 'unpaid',
        description: '',
        date: '',
        dueDate: '',
        to: '',
        from: '',
        item: [{
            description: '',
            quantity: '',
            rate: '',
            amount: '',
        }],
        notes: '',
        tos: '',
        tax: '',
        amount: 0,
    })

    const itemsToArr = invoiceForm.item



    const handleCurrencyChange = (
        value: string,
        name: string,
        index: number
    ) => {
        setInvoiceForm({...invoiceForm,
            item: invoiceForm.item.map((item, i) => {
                if (i === index) {
                    return {...item, [name]: value}
                }
                return item;
            })
        })
    }

    const editInvoiceRequest = async (data: mutateInvoice) => {
        setMutateLoading(true);
        await mutateInvoice(data).then(() => {
            setMutateLoading(false);
        });
    }

    const deleteInvoiceRequest = async (id: string) => {
        await deleteInvoice(id).then(() => {

        });
    }

    const handleItemChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setInvoiceForm({...invoiceForm,
         item: invoiceForm.item.map((item, i) => {
            if (i === index) {
                return {...item, [event.target.name]: event.target.value}
            }
            return item;
         })
        })
    }

    const removeInvoiceItem = (index: number) => {
        setInvoiceForm({...invoiceForm,
            item: invoiceForm.item.filter((item, i) => i !== index)
        })
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInvoiceForm({...invoiceForm, [event.target.name]: event.target.value})
    }

    const addItem = () => {
      setInvoiceForm({...invoiceForm, item: [...invoiceForm.item, {
          description: '',
          quantity: '',
          rate: '',
          amount: '',
          }]})
    }

    return {
        invoiceForm,
        setInvoiceForm,
        handleItemChange,
        handleCurrencyChange,
        removeInvoiceItem,
        mutateLoading,
        setMutateLoading,
        editInvoiceRequest,
        deleteInvoiceRequest,
        handleInputChange,
        addItem
    }

}
