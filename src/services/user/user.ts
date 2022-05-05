import {getRequest, postRequest} from "../types";
import {createUserParams} from "./types";



export const createUser = ({sub_id, email, name}: createUserParams) => {
 return postRequest('user', {
  sub_id: sub_id,
  email: email,
  name: name
 }, false);
}
