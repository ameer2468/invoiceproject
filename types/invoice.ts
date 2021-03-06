export interface IInvoice {
  id: string;
  description: string;
  date: string;
  duedate: Date | null | string | any;
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
  key: keyof IInvoice;
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
  status: string;
}

export interface MutateInvoice {
  id: string;
  amount: string;
  date: string;
  status: string;
  description: string;
}

export interface item {
  id: string;
  description: string;
  amount: number | string;
}
