import axios from 'axios'

const BASE_URL = 'https://2393f4961d67.ngrok-free.app'


// export const userVerify = async (email: string) => {
//  const axios = require('axios');
// let data = JSON.stringify({
//   "email": "umer@gmail.com"
// });
// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://2393f4961d67.ngrok-free.app/user/userVerify',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVtZXJAZ21haWwuY29tIiwiaWF0IjoxNzU0NTY2ODI4fQ.d0qDowRmnVbS2UhcwySSPiZo9jK6WrLVwnKYNX_HVmw'
//   },
//   data : data
// };
// axios.request(config)
// .then((response:any) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error:any) => {
//   console.log(error);
// });


// // const response=fetch(`${BASE_URL}/user/userVerify`,{
// //     method:'post',
// //     body:email,

// // })
// // const data=(await response).json();
// // console.log(data);
// // return data;
// }

// Submit OTP code using token


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
    console.error('userVerify error:', error)
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
          token,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('userCodeVerify error:', error)
    throw error
  }
}
