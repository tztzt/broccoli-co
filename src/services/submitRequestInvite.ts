import { PostRequestInvite } from '../types';

enum NetworkResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
}

const AWX_ENDPOINT = '/api/prod/fake-auth';

export const submitRequestInvite = async (data: PostRequestInvite) => {
  const api = AWX_ENDPOINT;
  return await fetch(api, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) return response.json();
    const { errorMessage } = await response.json();
    const error = errorMessage ?? `HTTP error! Status: ${response.status}`;
    throw new Error(error);
  });
};

//usedemail@airwallex.com
