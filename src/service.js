import axios from 'axios';

export const getRequest = async () => {
  try {
    const response = await axios.get('http://localhost:3000/hello');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

export const auth = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};
