import { Invoice, InvoiceData, MutateInvoice } from "../../types/invoice";
import { useState, ChangeEvent, useEffect } from "react";
import {
  deleteInvoice,
  getAllInvoices,
  mutateInvoice,
} from "../services/invoices/services";
import { useQuery } from "react-query";
import { getBindingIdentifiers } from "@babel/types";

export const useInvoice = () => {
  const [invoicesData, setInvoicesData] = useState<Invoice[]>([]);
  const [mutateLoading, setMutateLoading] = useState<boolean>(false);
  const [editInvoiceMode, setEditInvoiceMode] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<InvoiceData>({
    amount: "",
    date: "",
    description: "",
    invoiceItems: [],
    from: "",
    id: "",
    status: "",
    to: "",
  });
  const [invoiceForm, setInvoiceForm] = useState<Invoice>({
    id: "",
    status: "unpaid",
    description: "",
    date: "",
    dueDate: "",
    to: "",
    from: "",
    item: [
      {
        id: "",
        description: "",
        quantity: "",
        rate: "",
        amount: "",
      },
    ],
    notes: "",
    tos: "",
    tax: "",
    amount: 0,
  });

  const handleCurrencyChange = (value: string, name: string, index: number) => {
    setInvoiceForm({
      ...invoiceForm,
      item: invoiceForm.item.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        }
        return item;
      }),
    });
  };

  const editInvoiceRequest = async (data: mutateInvoice) => {
    setMutateLoading(true);
    await mutateInvoice(data)
      .then(() => {
        setMutateLoading(false);
        setInvoicesData(
          invoicesData.map((value) => {
            return value.id === data.id
              ? {
                  ...value,
                  status: value.status === "paid" ? "unpaid" : "paid",
                }
              : value;
          })
        );
      })
      .catch(() => {
        setMutateLoading(false);
      });
  };

  const deleteInvoiceRequest = async (id: string) => {
    await deleteInvoice(id)
      .then(() => {
        setInvoicesData(
          invoicesData.filter((invoice: { id: string }) => invoice.id !== id)
        );
      })
      .catch(() => {});
  };

  const handleItemChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setInvoiceForm({
      ...invoiceForm,
      item: invoiceForm.item.map((item, i) => {
        if (i === index) {
          return { ...item, [event.target.name]: event.target.value };
        }
        return item;
      }),
    });
  };

  const invoiceMutate = (type: keyof MutateInvoice) => {
    const mutateValue = (key: keyof MutateInvoice) => {
      const obj: MutateInvoice = {
        status: invoice.status === "paid" ? "unpaid" : "paid",
        amount: invoiceForm.amount.toString().split("$")[1],
        id: invoiceForm.id,
        date: invoiceForm.date,
      };
      return obj[key];
    };
    editInvoiceRequest({
      id: invoice.id,
      field: type,
      value: mutateValue(type),
    }).then(() => {
      setInvoice({
        ...invoice,
        [type]: mutateValue(type),
      });
      setEditInvoiceMode(false);
    });
  };

  const removeInvoiceItem = (index: number) => {
    setInvoiceForm({
      ...invoiceForm,
      item: invoiceForm.item.filter((item, i) => i !== index),
    });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInvoiceForm({
      ...invoiceForm,
      [event?.target.name]: event?.target.value,
    });
  };

  const addItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      item: [
        ...invoiceForm.item,
        {
          id: "",
          description: "",
          quantity: "",
          rate: "",
          amount: "",
        },
      ],
    });
  };

  return {
    invoiceForm,
    setInvoiceForm,
    handleItemChange,
    handleCurrencyChange,
    removeInvoiceItem,
    setInvoicesData,
    invoiceMutate,
    invoicesData,
    editInvoiceMode,
    setEditInvoiceMode,
    setInvoice,
    invoice,
    editInvoiceRequest,
    deleteInvoiceRequest,
    handleInputChange,
    addItem,
    mutateLoading,
  };
};

export const useFetchInvoices = () => {
  const { setInvoicesData, invoicesData } = useInvoice();
  const { isLoading, isFetching, data } = useQuery("invoices", getAllInvoices, {
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data) {
      const { invoices } = data;
      setInvoicesData(invoices);
    }
  }, [data, setInvoicesData]);
  return {
    isLoading,
    isFetching,
    invoicesData,
  };
};
