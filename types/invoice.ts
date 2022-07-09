export interface Invoice {
  id: string;
  description: string;
  date: string;
  dueDate: Date | null | string | any;
  to: string;
  status: string;
  from: string;
  invoiceItems: item[];
  account_number?: string;
  sort_code?: string;
  notes: string;
  tos: string;
  tax: string;
  amount: string;
}

export interface updateKeys {
  key: keyof Invoice;
  value: string | number | boolean;
}

export interface TextAreaLimits {
  description: string;
}

export interface InputLengthLimit {
  name: keyof TextAreaLimits | undefined;
  limit: number;
}

export interface MutateLoading {
  id: boolean;
  amount: boolean;
  delete: boolean;
  date: boolean;
  description: boolean;
  status: boolean;
}

export interface InvoiceRecord {
  amount: number | string;
  id: string;
  date: string;
  status: "paid" | "unpaid";
}

export interface MutateInvoice {
  id: string;
  amount: string;
  date: string;
  status: string;
  description: string;
}

export interface InvoiceData {
  amount: string;
  date: string;
  description: string;
  from: string;
  id: string;
  invoiceItems: item[];
  status: string;
  to: string;
}

export interface item {
  id: string;
  description: string;
  amount: number | string;
}
