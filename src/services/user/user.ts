import { postRequest, putRequest } from "../types";
import { createUserParams, mutateUserParams, postBankingParams } from "./types";

export const createUser = ({
  sub_id,
  email,
  first_name,
  last_name,
}: createUserParams) => {
  return postRequest(
    "user",
    {
      sub_id: sub_id,
      email: email,
      first_name: first_name,
      last_name: last_name,
    },
    false
  );
};

export const postBankingRequest = ({
  user_subid,
  account_number,
  sort_code,
}: postBankingParams) => {
  return postRequest(
    "banking",
    {
      user_subid: user_subid,
      account_number: account_number,
      sort_code: sort_code,
    },
    true
  );
};

export const mutateUser = ({ sub_id, field, value }: mutateUserParams) => {
  return putRequest("user", {
    sub_id: sub_id,
    field: field,
    value: value,
  });
};
