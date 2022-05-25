import axios from "axios";
import {Auth} from "aws-amplify";


const url = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;


export const loadToken = async () => {
  const user = await Auth.currentAuthenticatedUser();
  return user.signInUserSession.idToken.jwtToken;
};

export const putRequest = async (path: string, data: {}) => {
  const token = await loadToken();
  const headers = {
    'x-api-key': apiKey,
    Authorization: token,
  }
    return await axios.put(`${url}/${path}`, {
      ...data
    }, {
      headers: {
        ...headers
      }
    }).then((response) => {
      return response.data;
    }).catch((err) => {
      return err.response.data;
    })
}

export const getRequest = async (path: string, params: {}) => {
  const token = await loadToken();
  const headers = {
    'x-api-key': apiKey,
    Authorization: token
  };
  return await axios.get(`${url}/${path}`, {
    params: {
      ...params
    },
    headers: {
      ...headers
    }
  }).then((response) => {
    return response.data
  }).catch((err) => {
    return err.response.data;
  });
}

export const postRequest = async (path: string, data: {}, authed?: boolean) => {
  const token = authed && await loadToken();
  const headers = {
    'x-api-key': apiKey,
    Authorization: authed ? token : ''
  };
  return await axios.post(`${url}/${path}`, {
    ...data
  }, {
     headers: {
       ...headers
     }
  }).then((response) => {
    return response.data;
  }).catch((err) => {
    return err.response.data;
  });
}
