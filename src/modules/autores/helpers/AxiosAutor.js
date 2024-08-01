import axios from 'axios';

//const apiUrl = 'http://localhost:9090/authors';

//const apiUrl = '/apiAutor/authors';
const apiUrl = 'http://13.64.151.24:8080/authors';



export const getAllAuthors = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching all authors:', error);
    throw error;
  }
};

export const getAuthorById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching author with ID ${id}:`, error);
    throw error;
  }
};

export const createAuthor = async (author) => {
  try {
    await axios.post(apiUrl, author);
  } catch (error) {
    console.error('Error creating author:', error);
    throw error;
  }
};

export const updateAuthor = async (id, author) => {
  try {
    await axios.put(`${apiUrl}/${id}`, author);
  } catch (error) {
    console.error(`Error updating author with ID ${id}:`, error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error(`Error deleting author with ID ${id}:`, error);
    throw error;
  }
};
