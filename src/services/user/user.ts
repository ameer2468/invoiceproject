import {getRequest, postRequest, putRequest} from "../types";
import {createUserParams, mutateUserParams} from "./types";



export const createUser = ({sub_id, email, first_name, last_name}: createUserParams) => {
 return postRequest('user', {
  sub_id: sub_id,
  email: email,
  first_name: first_name,
  last_name: last_name
 }, false);
}

export const mutateUser = ({sub_id, field, value}: mutateUserParams) => {
 return putRequest('user', {
    sub_id: sub_id,
    field: field,
    value: value
 });
}
