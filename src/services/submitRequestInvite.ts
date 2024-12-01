import { PostRequestInvite } from '../types';

// const AWX_ENDPOINT =
// 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/api/prod/fake-auths';
const AWX_ENDPOINT = '/api/prod/fake-auth';
export const submitRequestInvite = async (data: PostRequestInvite) => {
  const api = AWX_ENDPOINT;
  return fetch(api, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Submit user info success: ', data);
      return data;
    })
    .catch((error) => {
      console.error('There was a problem with the operation:', error);
      throw new Error(error);
    });
};
