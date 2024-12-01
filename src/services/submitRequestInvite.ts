import { PostRequestInvite } from '../types';

enum NetworkReponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
}

const AWX_ENDPOINT = '/api/prod/fake-auth';

export const submitRequestInvite = async (data: PostRequestInvite) => {
  const api = AWX_ENDPOINT;
  return await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    /**
     * Handle happy flow
     */
    if (response.ok && response.status === NetworkReponseCode.SUCCESS) {
      return response.json();
    } else if (response.status === NetworkReponseCode.BAD_REQUEST) {
      /**
       * Handle known business errors
       */
      const responseBody = await response.json();
      const error = responseBody?.errorMessage;
      throw new Error(error);
    } else {
      /**
       * handle all other unexpected errors
       */
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  });
};
