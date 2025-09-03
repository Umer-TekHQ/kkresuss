import api from './axiosInstance';

export const walletApi = {
  createWallet: async () => {
    try {
      console.log('[walletApi] POST /wallet');
      const res = await api.post('/wallet');
      return res.data;
    } catch (err: any) {
      const status = err?.response?.status;
      console.log('[walletApi] POST /wallet failed', status, err?.response?.data || err?.message);
      if (status === 404) {
        try {
          console.log('[walletApi] POST /wallets');
          const res = await api.post('/wallets');
          return res.data;
        } catch (err2: any) {
          const status2 = err2?.response?.status;
          console.log('[walletApi] POST /wallets failed', status2, err2?.response?.data || err2?.message);
          if (status2 === 404) {
            console.log('[walletApi] POST /user/wallets');
            const res = await api.get('/user/wallets');
            return res.data;
          }
          throw err2;
        }
      }
      throw err;
    }
  },

  getUserWallets: async () => {
    try {
      console.log('[walletApi] GET /userWallets');
      const res = await api.get('/userWallets');
      return res.data;
    } catch (err: any) {
      const status = err?.response?.status;
      console.log('[walletApi] GET /userWallets failed', status, err?.response?.data || err?.message);
      if (status === 404) {
        try {
          console.log('[walletApi] GET /user/userWallets');
          const res = await api.get('/user/userWallets');
          return res.data;
        } catch (err2: any) {
          const status2 = err2?.response?.status;
          console.log('[walletApi] GET /user/userWallets failed', status2, err2?.response?.data || err2?.message);
          if (status2 === 404) {
            console.log('[walletApi] GET /user/wallets');
            const res = await api.get('/user/wallets');
            return res.data;
          }
          throw err2;
        }
      }
      if (status === 404) {
        try {
          console.log('[walletApi] GET /userWallets/');
          const res = await api.get('/userWallets/');
          return res.data;
        } catch (err3: any) {
          console.log('[walletApi] GET /userWallets/ failed', err3?.response?.status, err3?.response?.data || err3?.message);
        }
      }
      if (status === 404) {
        try {
          console.log('[walletApi] GET /userWallet');
          const res = await api.get('/userWallet');
          return res.data;
        } catch (err4: any) {
          console.log('[walletApi] GET /userWallet failed', err4?.response?.status, err4?.response?.data || err4?.message);
        }
      }
      throw err;
    }
  },
};
