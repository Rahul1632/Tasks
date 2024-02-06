// import axios from 'axios';
// import idx from 'idx';
// // import { sessionService } from 'redux-react-session';
// import { apiUrl as API_URL } from '../../../clientConfig';

// export function doForgotPassword(email) {
//   return () =>
//     axios({
//       method: 'post',
//       url: `${API_URL}api/forget-password/${email}`,
//     })
//       .then((response) => {
//         if (response?.data) {
//           return response.data;
//         }
//         return response;
//       })
//       .catch((error) => idx(error, (_) => _.response.data));
// }

// export function doResetPassword(data) {
//   return () =>
//     axios({
//       method: 'put',
//       url: `${API_URL}api/change-password`,
//       data,
//     })
//       .then((response) => {
//         if (response?.data) {
//           return response.data;
//         }
//         return response;
//       })
//       .catch((error) => idx(error, (_) => _.response.data));
// }
// export function doGetResetToken(token) {
//   return () =>
//     axios({
//       method: 'get',
//       url: `${API_URL}api/get-emp-by-token/${token}`,
//     })
//       .then((response) => {
//         if (response?.data) {
//           return response.data;
//         }
//         return response;
//       })
//       .catch((error) => idx(error, (_) => _.response.data));
// }
