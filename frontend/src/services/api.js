import axios from 'axios';

//
const BASE_URL = 'http://localhost:5000/api';
// const BASE_URL = "http://103.194.228.88:5000/api";


// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add image base URL
export const IMAGE_BASE_URL = 'http://localhost:5000';
// export const IMAGE_BASE_URL = "http://103.194.228.88:5000";

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const auth = {
  sendOTP: (email) => api.post('/auth/send-otp', { email }),
  verifyOTP: (email, otp) => api.post('/auth/login', { email, otp }),
  signup: (userData) => api.post('/auth/register', userData)
};

export const certificatesApis = {
  getAll: () => api.get("/admin/all-certificates"),
  getByRecordNo: (recordNo) => api.get(`/certificates/${recordNo}`),
  previewByRecordNo: (recordNo) =>
    api.post(`/user/certificates/preview`, recordNo),
  publishCertificate: (id) => api.put(`/admin/certificates/publish/${id}`),
  // publishCertificate: (id) => axios.put(`${API_BASE}/certificates/publish/${id}`)
  getCertificateByMail: (email) => api.post(`/user/certificates/email`, email),
  create: (certificateData) => api.post("/admin/certificate", certificateData),
  update: (recordNo, certificateData) =>
    api.put(`/certificates/${recordNo}`, certificateData),
  deleteCertificate: (id) => api.post(`/admin/certificates/delete`, id),
};

export const sendContactMessage = async (data) => {
  return await axios.post(`${BASE_URL}/contact`, data);
};

export default api;
