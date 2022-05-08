export interface Invoice {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  billTo: string;
  from: string;
  item: item[];
  notes: string;
  tos: string;
  tax: string;
  amountToPay: number;
}

export interface item {
  description: string;
  quantity: number | string;
  rate: number | string;
  amount: number | string;
}
