// services/bookService.js
import axios from 'axios';

//const apiUrl = 'http://localhost:8090/books'; // URL base de la API de libros

//const apiUrl = '/apiLibro/books';

const apiUrl = 'http://40.78.125.177:8080/books'


export const getAllBooks = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

export const createBook = async (book) => {
  try {
    await axios.post(apiUrl, book);
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (id, book) => {
  try {
    await axios.put(`${apiUrl}/${id}`, book);
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};
