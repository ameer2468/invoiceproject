import { v4 as uuidv4 } from "uuid";

export const invoiceFormState = {
  id: "",
  status: "unpaid",
  description: "",
  date: new Date().toISOString().split("T")[0],
  dueDate: null,
  to: "",
  from: "",
  invoiceItems: [
    {
      id: uuidv4(),
      description: "",
      amount: "",
    },
  ],
  notes: "",
  tos: "",
  tax: "",
  amount: "",
};
