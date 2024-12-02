import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';

import { submitRequestInvite } from '../submitRequestInvite';

// Adjust the path as needed

// Mock data and endpoint
const mockData = { name: 'name', email: 'test@example.com' };
const mockResponseBody = { errorMessage: 'Bad Request' };

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
) as Mock;

describe('submitRequestInvite', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.restoreAllMocks();
  });

  it('should return a response object when the request is successful', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ message: 'Success' }),
        }),
      ) as Mock,
    );

    // Call the function
    const result = await submitRequestInvite(mockData);

    // Validate the response
    expect(result).toEqual({ message: 'Success' });
    expect(fetch).toHaveBeenCalledWith('/api/prod/fake-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData),
    });
  });

  it('should throw an error when the status is 400 and the response contains an error message', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 400,
          json: () => Promise.resolve({ errorMessage: 'Bad Request' }),
        }),
      ) as Mock,
    );

    // Call the function and assert that an error is thrown
    await expect(submitRequestInvite(mockData)).rejects.toThrowError(
      mockResponseBody.errorMessage,
    );
  });

  it('should throw a generic error for non-200 and non-400 status codes', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 500,
          json: () =>
            Promise.resolve({ errorMessage: "Doesn't matter what is here" }),
        }),
      ) as Mock,
    );

    // Call the function and assert that an error is thrown
    await expect(submitRequestInvite(mockData)).rejects.toThrowError(
      'HTTP error! Status: 500',
    );
  });
});
