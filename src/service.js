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
    const response = await axios.post('http://localhost:3000/api/auth', {
      username,
      password,
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

export const putEmployees = async (employee) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/employees/put',
      {
        token,
        employee,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
  }
};

export const updateEmployees = async (employee) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/employees/update',
      {
        token,
        employee,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
  }
};

export const deleteEmployees = async (employeesIds) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/employees/delete',
      {
        token,
        employeesIds,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
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

export const putDepartments = async (department) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments/put',
      { token, department }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const updateDepartments = async (department) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments/update',
      { token, department }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const deleteDepartments = async (departmentsIds) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments/delete',
      { token, departmentsIds }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const getProjects = async () => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/projects/get',
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

export const putProjects = async (project) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/projects/put',
      {
        token,
        project,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
  }
};

export const updateProjects = async (project) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/projects/update',
      {
        token,
        project,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
  }
};

export const deleteProjects = async (projectsIds) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/projects/delete',
      {
        token,
        projectsIds,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
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

export const putDepartmentsEmployees = async (departmentEmployee) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments_employees/put',
      {
        token,
        departmentEmployee,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const updateDepartmentsEmployees = async (departmentEmployee) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments_employees/update',
      { token, departmentEmployee }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const deleteDepartmentsEmployees = async (departmentsEmployeesIds) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:3000/api/departments_employees/delete',
      { token, departmentsEmployeesIds }
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
