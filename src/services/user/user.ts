import {getRequest, postRequest} from "../types";
import {createUserParams} from "./types";



export const createUser = ({sub_id, email, first_name, last_name}: createUserParams) => {
 return postRequest('user', {
  sub_id: sub_id,
  email: email,
  first_name: first_name,
  last_name: last_name
 }, false);
}
