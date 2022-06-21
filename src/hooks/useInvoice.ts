import {
  Invoice,
  InvoiceData,
  MutateInvoice,
  MutateLoading,
} from "../../types/invoice";
import { v4 as uuidv4 } from "uuid";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  mutateInvoice,
} from "../services/invoices/services";
import { useQuery } from "react-query";
import { invoiceFormState } from "../constants";
import { useRouter } from "next/router";

/*
  This hook is used to manage the state of the invoice form,
    and the data that is being displayed in the form,
    and the data that is being sent to the server.

    hooks in file:

        useInvoice,
        useInvoiceData: Deals with data of an individual invoice,
        useFetchInvoices: Fetches all invoices from database
 */

export const useInvoice = () => {
  const [invoicesData, setInvoicesData] = useState<Invoice[]>([]);
  const [editInvoiceMode, setEditInvoiceMode] = useState<boolean>(false);
  const [createInvoiceLoading, setCreateInvoiceLoading] =
    useState<boolean>(false);
  const [invoiceForm, setInvoiceForm] = useState<Invoice>({
    ...invoiceFormState,
  });
  const route = useRouter();

  /* Input handler when pricing items on create invoice form */

  const handleCurrencyChange = (value: string, key: string, index: number) => {
    setInvoiceForm({
      ...invoiceForm,
      invoiceItems: invoiceForm.invoiceItems.map((item, i) => {
        if (i === index) {
          return { ...item, [key]: value };
        }
        return item;
      }),
    });
  };

  /* Create invoice handler */

  const handleCreateInvoice = (e?: FormEvent<SubmitEvent>) => {
    e?.preventDefault();
    setCreateInvoiceLoading(true);
    createInvoice(invoiceForm)
      .then(() => {
        setInvoiceForm({ ...invoiceFormState });
      })
      .then(() => {})
      .finally(() => {
        setCreateInvoiceLoading(false);
        route.replace(invoiceForm.id);
      });
  };

  /* Delete invoice from database & UI */

  const deleteInvoiceRequest = (id: string) => {
    deleteInvoice(id)
      .then(() => {
        setInvoicesData(
          invoicesData.filter((invoice: { id: string }) => invoice.id !== id)
        );
      })
      .catch(() => {
        console.log("Error deleting invoice");
      });
  };

  /* Input handler for invoice form of individual items */

  const handleItemChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setInvoiceForm({
      ...invoiceForm,
      invoiceItems: invoiceForm.invoiceItems.map((item, i) => {
        if (i === index) {
          return { ...item, [event.target.name]: event.target.value };
        }
        return item;
      }),
    });
  };

  /* Removes an item from the invoice form */

  const removeInvoiceItem = (index: number) => {
    setInvoiceForm({
      ...invoiceForm,
      invoiceItems: invoiceForm.invoiceItems.filter((item, i) => i !== index),
    });
  };

  /* Handles currency change on an individual invoice/individual basis */

  const handleCurrencyValueChange = (value: string | undefined) => {
    setInvoiceForm({
      ...invoiceForm,
      amount: value as string,
    });
  };

  /* Update an individual key in the invoice form */

  const updateInvoiceForm = (key: string, value: string | boolean) => {
    setInvoiceForm({
      ...invoiceForm,
      [key]: value,
    });
  };

  /* Generic input handler for invoice form */

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInvoiceForm({
      ...invoiceForm,
      [event?.target.name]: event?.target.value,
    });
  };

  /* Adds an item to the invoice form */

  const addItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      invoiceItems: [
        ...invoiceForm.invoiceItems,
        {
          id: uuidv4(),
          description: "",
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
    createInvoiceLoading,
    removeInvoiceItem,
    handleCurrencyValueChange,
    handleCreateInvoice,
    updateInvoiceForm,
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
  const [mutateLoading, setMutateLoading] = useState<MutateLoading>({
    id: false,
    amount: false,
    date: false,
    status: false,
  });
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const { editInvoiceMode, setEditInvoiceMode } = useInvoice();

  /* When editing an individual invoice - this is a loading handler
  depending on the field that is being edited */

  const mutateLoadHandler = (key: string, value: boolean) => {
    setMutateLoading({
      ...mutateLoading,
      [key]: value,
    });
  };

  /* When editing an individual invoice - this is a mutate handler */

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

  /* When editing an individual invoice - this makes the request
   * on confirm button click */

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
    mutateLoadHandler(type, true);
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
        setEditInvoiceMode(false);
      })
      .catch(() => {})
      .finally(() => {
        mutateLoadHandler(type, false);
      });
  };

  /* useEffect sets invoice data to state on page load*/

  useEffect(() => {
    setInvoice({ ...invoiceData, invoiceItems: invoiceData.invoiceItems });
  }, []);
  return {
    invoice,
    editInvoiceHandler,
    invoiceMutate,
    mutateLoading,
    setEditInvoiceMode,
    editInvoiceMode,
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
