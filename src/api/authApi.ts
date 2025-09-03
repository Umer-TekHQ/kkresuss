import api, { storage } from './axiosInstance';

export const authApi = {
  verifyEmail: async (email: string) => {
    const res = await api.post('/user/userVerify', { email });
    const { token } = res.data;

    if (token) {
      storage.set('token', token);
    }

    return res.data;
  },

  verifyOtp: async (code: string) => {
  try {
  const res = await api.post('/user/userCode', { code }); 
  return res.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
}

};
