export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';

export const apiError = (message) => ({
  type: API_ERROR,
  payload: message
});

export const clearApiError = () => ({
  type: API_ERROR_CLEAR
});
