import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createContactApi = (data) => {
  return api.post('/contacts', data);
};
