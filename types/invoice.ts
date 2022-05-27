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

export interface item {
  description: string;
  quantity: number | string;
  rate: number | string;
  amount: number | string;
}

export interface TestBranch {
  firstCommit: string;
  secondCommit: string;
  thirdCommit: string;
}
