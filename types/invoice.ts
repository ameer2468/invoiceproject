export interface Invoice {
  id: string;
  description: string;
  date: string;
  dueDate: string;
  to: string
  status: string;
  from: string;
  item: item[];
  notes: string;
  tos: string;
  tax: string;
  amount: number;
}

export interface invoiceData {
  amount: string;
  date: string;
  description: string;
  from: string;
  id: string;
  status: string;
  to: string;
}

export interface item {
  id: string;
  description: string;
  quantity: number | string;
  rate: number | string;
  amount: number | string;
}
