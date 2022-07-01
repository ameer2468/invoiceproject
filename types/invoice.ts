export interface Invoice {
  id: string;
  description: string;
  date: string;
  dueDate: Date | null;
  to: string;
  status: string;
  from: string;
  invoiceItems: item[];
  notes: string;
  tos: string;
  tax: string;
  amount: string;
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
  status: boolean;
}

export interface MutateInvoice {
  id: string;
  amount: string;
  date: string;
  status: string;
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
