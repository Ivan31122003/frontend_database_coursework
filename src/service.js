import axios from 'axios';
import { getCookie } from './cookie';

export const getRequest = async () => {
  try {
    const response = await axios.get('http://localhost:3000/hello');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const auth = async (username, password) => {
  try {
    const token = getCookie('token');
    const response = await axios.post('http://localhost:3000/api/auth', {
      username,
      password,
      token,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const getEmployees = async () => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/employees/get',
      {
        token,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const getDepartments = async () => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments/get',
      { token }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const getDepartmentsEmployees = async () => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments_employees/get',
      {
        token,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const getUsers = async () => {
  try {
    const token = getCookie('token');
    const response = await axios.post('http://localhost:3000/api/users/get', {
      token,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};
