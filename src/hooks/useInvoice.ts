import {Invoice} from "../../types/invoice";
import {useState, ChangeEvent} from "react";

export const useInvoice = () => {

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
        handleInputChange,
        addItem
    }

}
