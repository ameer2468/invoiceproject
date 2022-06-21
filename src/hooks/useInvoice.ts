import { Invoice, InvoiceData, MutateInvoice } from "../../types/invoice";
import { useState, ChangeEvent, useEffect } from "react";
import {
  deleteInvoice,
  getAllInvoices,
  mutateInvoice,
} from "../services/invoices/services";
import { useQuery } from "react-query";
import { invoiceFormState } from "../constants";

export const useInvoice = () => {
  const [invoicesData, setInvoicesData] = useState<Invoice[]>([]);
  const [editInvoiceMode, setEditInvoiceMode] = useState<boolean>(false);
  const [invoiceForm, setInvoiceForm] = useState<Invoice>({
    ...invoiceFormState,
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

  const deleteInvoiceRequest = (id: string) => {
    deleteInvoice(id).then(() => {
      setInvoicesData(
        invoicesData.filter((invoice: { id: string }) => invoice.id !== id)
      );
    });
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

  const removeInvoiceItem = (index: number) => {
    setInvoiceForm({
      ...invoiceForm,
      item: invoiceForm.item.filter((item, i) => i !== index),
    });
  };

  const handleCurrencyValueChange = (value: string | undefined) => {
    setInvoiceForm({
      ...invoiceForm,
      amount: value as string,
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
    handleCurrencyValueChange,
    setInvoicesData,
    invoicesData,
    editInvoiceMode,
    setEditInvoiceMode,
    deleteInvoiceRequest,
    handleInputChange,
    addItem,
  };
};

export const useInvoiceData = (
  invoiceData: InvoiceData,
  invoiceForm: Invoice,
  setInvoiceForm: (invoiceForm: Invoice) => void
) => {
  const [mutateLoading, setMutateLoading] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const { editInvoiceMode, setEditInvoiceMode } = useInvoice();

  const editInvoiceHandler = (invoiceData: InvoiceData) => {
    setEditInvoiceMode(!editInvoiceMode);
    setInvoiceForm({
      ...invoiceForm,
      id: invoiceData.id,
      date: invoiceData.date,
      amount: invoiceData.amount,
      status: invoiceData.status,
    });
  };

  const invoiceMutate = (type: keyof MutateInvoice) => {
    const mutateValue = (key: keyof MutateInvoice) => {
      const obj: MutateInvoice = {
        status: invoice?.status === "paid" ? "unpaid" : "paid",
        amount: invoiceForm.amount,
        id: invoiceForm.id,
        date: invoiceForm.date,
      };
      return obj[key];
    };
    setMutateLoading(true);
    mutateInvoice({
      id: invoice?.id || "",
      field: type,
      value: mutateValue(type),
    })
      .then(() => {
        setInvoice({
          ...(invoice as InvoiceData),
          [type]: mutateValue(type),
        });
        setMutateLoading(false);
        setEditInvoiceMode(false);
      })
      .catch(() => {
        setMutateLoading(false);
      });
  };

  useEffect(() => {
    setInvoice({ ...invoiceData, invoiceItems: invoiceData.invoiceItems });
  }, []);
  return {
    invoice,
    editInvoiceHandler,
    invoiceMutate,
    setEditInvoiceMode,
    editInvoiceMode,
    mutateLoading,
    setMutateLoading,
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
