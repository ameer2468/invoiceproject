import {
  Invoice,
  InvoiceData,
  MutateInvoice,
  MutateLoading,
  updateKeys,
} from "../../types/invoice";
import { v4 as uuidv4 } from "uuid";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoices,
  mutateInvoice,
} from "../services/invoices/services";
import { useQuery } from "react-query";
import { invoiceFormState } from "../constants";
import { useRouter } from "next/router";
import { useUser } from "../UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { successToast } from "../helpers";

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
  const { user } = useUser();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [createInvoiceLoading, setCreateInvoiceLoading] = useState<boolean>(false);
  const [invoiceForm, setInvoiceForm] = useState<Invoice>({
    ...invoiceFormState,
    from: user[0].attributes["custom:firstname"],
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

  /*Toggle Calendar*/

  const toggleCalendar = (active: boolean) => {
    setCalendarOpen(active);
  };

  /*Date handler*/

  const handleDateChange = (date: Date | null) => {
    setInvoiceForm({ ...invoiceForm, dueDate: date });
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
        route.replace(`invoice?q=${invoiceForm.id}`).then(() => {
          setCreateInvoiceLoading(false);
        });
        toast("Invoice created successfully", successToast);
      });
  };

  /* Input handler for invoice form of individual items */

  const handleItemChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
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

  /* Update multiple invoice values*/

  const updateMultiValues = (valuesToUpdate: updateKeys[]) => {
    setInvoiceForm(
      valuesToUpdate.reduce((acc, curr) => {
        return { ...acc, [curr.key]: curr.value };
      }, invoiceForm)
    );
  };

  /* Update an individual key in the invoice form */

  const updateInvoiceForm = (key: keyof Invoice, value: string | number | boolean) => {
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
    handleDateChange,
    updateInvoiceForm,
    updateMultiValues,
    toggleCalendar,
    setInvoicesData,
    invoicesData,
    editInvoiceMode,
    setEditInvoiceMode,
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
    delete: false,
    description: false,
    status: false,
  });
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const { editInvoiceMode, setEditInvoiceMode } = useInvoice();
  const router = useRouter();

  /* When editing an individual invoice - this is a loading handler
  depending on the field that is being edited */

  const mutateLoadHandler = (key: string, value: boolean) => {
    setMutateLoading({
      ...mutateLoading,
      [key]: value,
    });
  };

  /* Delete invoice from database & UI */

  const deleteInvoiceRequest = (id: string) => {
    mutateLoadHandler("delete", true);
    deleteInvoice(id)
      .then(() => {
        router.replace("/dashboard/invoices");
        toast("Invoice deleted successfully", successToast);
      })
      .catch(() => {})
      .finally(() => {
        mutateLoadHandler("delete", false);
      });
  };

  /* When editing an individual invoice - this is a mutate handler */

  const editInvoiceHandler = (invoiceData: InvoiceData) => {
    setEditInvoiceMode(!editInvoiceMode);
    setInvoiceForm({
      ...invoiceForm,
      id: invoiceData.id,
      description: invoiceData.description,
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
        description: invoiceForm.description,
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
        toast("Invoice updated successfully", successToast);
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
    deleteInvoiceRequest,
    editInvoiceMode,
    setMutateLoading,
  };
};

export const useFetchOverviewInvoices = () => {
  const { user } = useUser();
  const userInfo = user[0];
  const [period, setPeriod] = useState("All");
  const {
    data: paidInvoices,
    isLoading,
    isFetching,
    refetch: refetchPaidInvoices,
    error,
  } = useQuery(
    "All invoices",
    () =>
      getInvoices(
        "paid",
        userInfo.attributes["custom:firstname"],
        period === "All" ? "" : period
      ),
    {
      refetchOnWindowFocus: false,
    }
  );
  const {
    data: unpaidInvoices,
    isLoading: isLoadingUnpaid,
    isFetching: isFetchingUnpaid,
    refetch: refetchUnpaid,
    error: errorUnpaid,
  } = useQuery(
    "All unpaid invoices",
    () =>
      getInvoices(
        "unpaid",
        userInfo.attributes["custom:firstname"],
        period === "All" ? "" : period
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const refetchData = async () => {
      await axios.all([refetchPaidInvoices(), refetchUnpaid()]);
    };
    refetchData();
  }, [period]);

  return {
    unpaidInvoices,
    paidInvoices,
    isLoadingUnpaid,
    isLoading,
    isFetchingUnpaid,
    setPeriod,
    isFetching,
  };
};

export const useFetchInvoices = () => {
  const { setInvoicesData, invoicesData } = useInvoice();
  const { user } = useUser();
  const userInfo = user[0];
  const { isLoading, isFetching, data } = useQuery(
    "invoices",
    () => getAllInvoices(userInfo.attributes["custom:firstname"]),
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (data) {
      setInvoicesData(data);
    }
  }, [data, setInvoicesData]);
  return {
    isLoading,
    isFetching,
    invoicesData,
  };
};
