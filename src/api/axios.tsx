import axios from 'axios';

const baseUrl = 'https://dummy-api-jtg6bessta-ey.a.run.app';

export const getCategories = async () => {
  const url = `${baseUrl}/getCategories`;
  const response = await axios.get(url);
  return response.data;
};

export const getQuestions = async () => {
  const url = `${baseUrl}/getQuestions`;
  const response = await axios.get(url);
  return response.data;
};
