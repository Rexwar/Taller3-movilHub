import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//axios.defaults.baseURL = "http://localhost:8000/";

const ApiManager = axios.create({
  baseURL: "http://192.168.56.1:8000",
  responseType: "json",
  withCredentials: true,
});

const responseBody = (response) => {
  response.data;
  console.log(response.data);
}

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};
//para usar requests para registrar, es de la forma : requests.post("/register", { name, email, birthdate, rut  })

//const addTokenToRequest = async (config) => {
//  const token = await AsyncStorage.getItem("AccessToken");
//  if (token) {
//    config.headers.Authorization = `Bearer ${token}`;
//  }
//  return config;
//};

//axios.interceptors.request.use(addTokenToRequest);

// const Parking = {
//   getAllParkingData: () => requests.get(`/parking`),
//   calculateExtraFee: (parkingId) => requests.get(`/calculateExtraFee`),
//   calculateFinalPayment: (user_id) =>
//     requests.post(`/calculateFinalPayment`, user_id),
//   getOccupiedSpaces: () => requests.get(`parking/occupiedSpaces`),
//   registerPayment: (user_id) => requests.post("/registerPayment", user_id),
//   getParkingUserData: ({ parking_id, user_id }) =>
//     requests.post("/parkinguserdata", { parking_id, user_id }),
//   getHistory: (userId) => requests.get(`/parking/history/${userId}`, userId),
// };

// const Reservation = {
//   createReservation: (reservationData) =>
//     requests.post("/reservations", reservationData),
//   getReservationByUserId: (user_id) =>
//     requests.get(`/reservations/user/${user_id}`),
// };

 const Login = {
   login: (email, password) => requests.post("/login", { email, password }),
   //console.log()
//   register: (name, lastname, email, password, priority) =>
//     requests.post("user/register", {
//       name,
//       lastname,
//       email,
//       password,
//       priority,
//     }),
 };

const agent = {
  Login,
  requests,
  // Parking,
  // Reservation,
};

export default agent;