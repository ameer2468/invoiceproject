import { deleteRequest, getRequest, postRequest, putRequest } from "../types";
import {
  createUserParams,
  deleteBankingParams,
  mutateUserParams,
  postBankingParams,
} from "./types";

/*Request to get notifications*/

export const getNotifications = (user_subid: string) => {
  return getRequest(`notifications`, {
    user_subid,
  });
};

/*Request to read notifs*/

export const markAllAsReadRequest = (user_subid: string) => {
  return putRequest(`notifications`, {
    user_subid: user_subid,
  });
};

/*Request to create user*/

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

/*Delete banking details*/

export const deleteBankingRequest = (user_subid: deleteBankingParams) => {
  return deleteRequest("banking", {
    user_subid: user_subid,
  });
};

/*Post banking details*/

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

/*Get banking details*/

export const getBankingRequest = (user_subid: string) => {
  return getRequest("banking", {
    user_subid: user_subid,
  });
};

/*Request to update user*/

export const mutateUser = ({ sub_id, field, value }: mutateUserParams) => {
  return putRequest("user", {
    sub_id: sub_id,
    field: field,
    value: value,
  });
};
