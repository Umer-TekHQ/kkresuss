import axios from 'axios'

const BASE_URL = 'http://13.213.72.15:5000'

export const userVerify = async (email: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/userVerify`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    console.log('Server response:', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}


export const userCodeVerify = async (code: string, token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/userCode`,
      { code },
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error: any) {
    const msg = error?.response?.data?.message || 'Invalid code';
    return Promise.reject(msg); 
  }
}

