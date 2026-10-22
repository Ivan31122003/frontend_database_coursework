import { reactive } from 'vue';
import {
  getEmployees,
  getDepartments,
  getProjects,
  getDepartmentsEmployees,
  getUsers,
} from '@/service.js';

const state = reactive({
  employees: {
    headers: [],
    rows: [],
  },
  departments: {
    headers: [],
    rows: [],
  },
  projects: {
    headers: [],
    rows: [],
  },
  departments_employees: {
    headers: [],
    rows: [],
  },
  users: {
    headers: [],
    rows: [],
  },
  newRow: {},
  isButtonClick: false,
  isCreateButtonClick: false,
  selectedRows: [],
});

const getEmployeesList = async () => {
  const response = await getEmployees();
  if (response?.success) {
    state.employees.headers = response.items.headers;
    state.employees.rows = response.items.body;
    return true;
  } else if (response?.access) {
    return false;
  }
};

const getDepartmentsList = async () => {
  const response = await getDepartments();
  if (response?.success) {
    state.departments.headers = response.items.headers;
    state.departments.rows = response.items.body;
    return true;
  } else if (response?.access) {
    return false;
  }
};

const getProjectsList = async () => {
  const response = await getProjects();
  if (response?.success) {
    state.projects.headers = response.items.headers;
    state.projects.rows = response.items.body;
    return true;
  } else if (response?.access) {
    return false;
  }
};

const getDepartmentsEmployeesList = async () => {
  const response = await getDepartmentsEmployees();
  if (response?.success) {
    state.departments_employees.headers = response.items.headers;
    state.departments_employees.rows = response.items.body;
    return true;
  } else if (response?.access) {
    return false;
  }
};

const getUsersList = async () => {
  const response = await getUsers();
  if (response?.success) {
    state.users.headers = response.items.headers;
    state.users.rows = response.items.body;
    return true;
  } else if (response?.access) {
    return false;
  }
};

export default {
  state,
  getEmployeesList,
  getDepartmentsList,
  getProjectsList,
  getDepartmentsEmployeesList,
  getUsersList,
};
