import {getRequest, postRequest} from "./types";



export const createUser = (
    sub_id: string,
    email: string,
    name: string) => {
 return postRequest('user', {
  sub_id: sub_id,
  email: email,
  name: name
 }, false);
}
