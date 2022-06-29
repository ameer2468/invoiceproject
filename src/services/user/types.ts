export interface createUserParams {
  sub_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface mutateUserParams {
  sub_id: string;
  field: string;
  value: string | number;
}

export interface postBankingParams {
  account_number: string;
  sort_code: string;
  user_subid: string;
}

export interface deleteBankingParams {
  user_subid: string;
}
