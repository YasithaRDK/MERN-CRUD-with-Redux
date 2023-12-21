import axios from "axios";

const API_URL = "/api/students";

export const fetchStudents = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await axios.post(`${API_URL}`, data);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
