<template>
    <div class="container mt-4">
      <h1 class="mb-4 text-center">Books</h1>
  
      <!-- Formulario para crear o editar un libro -->
      <div class="row justify-content-center">
        <div class="col-md-8">
          <form @submit.prevent="saveBook" class="border p-4 rounded">
            <div class="mb-3">
              <label for="isbn" class="form-label">ISBN</label>
              <input
                type="text"
                id="isbn"
                v-model="book.isbn"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                id="title"
                v-model="book.title"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input
                type="number"
                id="price"
                v-model="book.price"
                class="form-control"
                step="0.01"
                required
              />
            </div>
            <div class="mb-3">
              <label for="authorId" class="form-label">Author ID</label>
              <input
                type="number"
                id="authorId"
                v-model="book.authorId"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">
              {{ isEditing ? 'Update Book' : 'Create Book' }}
            </button>
          </form>
        </div>
      </div>
  
      <!-- Lista de libros -->
      <div class="row mt-4 justify-content-center">
        <div class="col-md-12">
          <h2 class="text-center">Book List</h2>
          <div class="table-container border rounded">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>ISBN</th>
                  <th>Price</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in books" :key="book.id">
                  <td>{{ book.title }}</td>
                  <td>{{ book.isbn }}</td>
                  <td>${{ book.price }}</td>
                  <td>{{ book.authorName }}</td>
                  <td>
                    <button
                      @click="editBook(book)"
                      class="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteBook(book.id)"
                      class="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
  } from '../helpers/AxiosLibro';
  
  export default {
    data() {
      return {
        books: [],
        book: {
          id: null,
          isbn: '',
          title: '',
          price: '',
          authorId: ''
        },
        isEditing: false
      };
    },
    methods: {
      async fetchBooks() {
        try {
          this.books = await getAllBooks();
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      },
      async saveBook() {
        try {
          if (this.isEditing) {
            await updateBook(this.book.id, this.book);
          } else {
            await createBook(this.book);
          }
          this.resetForm();
          await this.fetchBooks();
        } catch (error) {
          console.error('Error saving book:', error);
        }
      },
      editBook(book) {
        this.book = { ...book };
        this.isEditing = true;
      },
      async deleteBook(id) {
        try {
          await deleteBook(id);
          await this.fetchBooks();
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      },
      resetForm() {
        this.book = {
          id: null,
          isbn: '',
          title: '',
          price: '',
          authorId: ''
        };
        this.isEditing = false;
      }
    },
    mounted() {
      this.fetchBooks();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  
  .table {
    width: 100%;
  }
  
  .table-container {
    border: 2px solid #dee2e6;
    border-radius: 0.375rem;
    overflow: hidden;
  }
  
  .table td, .table th {
    vertical-align: middle;
  }
  
  .btn {
    width: auto;
  }
  </style>
  