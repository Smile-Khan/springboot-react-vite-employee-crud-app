import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/employees'; // Replace with your backend URL

export const getEmployeeHistory = async (employeeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};
