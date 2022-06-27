export interface Settings {
  accountNumber: string;
  accountName: null | string;
  sortCode: string;
  newEmail: string;
  currentEmail: string;
  verifyCode: string;
  verifyStep: number;
}

export interface BankingInfo {
  account_number: string;
  sort_code: string;
}
