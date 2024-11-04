import { reactive } from 'vue';
import {
  getEmployees,
  getDepartments,
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
  departments_employees: {
    headers: [],
    rows: [],
  },
  users: {
    headers: [],
    rows: [],
  },
});

const getEmployeesList = async () => {
  const response = await getEmployees();
  if (response?.success) {
    state.employees.headers = response.items.headers;
    state.employees.rows = response.items.body;
  }
};

const getDepartmentsList = async () => {
  const response = await getDepartments();
  if (response?.success) {
    state.departments.headers = response.items.headers;
    state.departments.rows = response.items.body;
  }
};

const getDepartmentsEmployeesList = async () => {
  const response = await getDepartmentsEmployees();
  if (response?.success) {
    state.departments_employees.headers = response.items.headers;
    state.departments_employees.rows = response.items.body;
  }
};

const getUsersList = async () => {
  const response = await getUsers();
  if (response?.success) {
    state.users.headers = response.items.headers;
    state.users.rows = response.items.body;
  }
};

export default {
  state,
  getEmployeesList,
  getDepartmentsList,
  getDepartmentsEmployeesList,
  getUsersList,
};
