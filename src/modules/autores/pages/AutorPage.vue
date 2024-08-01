<template>
    <div class="container mt-4">
      <h1 class="mb-4 text-center">Authors</h1>
      
      <!-- Formulario para crear o editar un autor -->
      <div class="row justify-content-center">
        <div class="col-md-8">
          <form @submit.prevent="saveAuthor" class="border p-4 rounded">
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="author.firstName"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="author.lastName"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">
              {{ isEditing ? 'Update Author' : 'Create Author' }}
            </button>
          </form>
        </div>
      </div>
    
      <!-- Lista de autores -->
      <div class="row mt-4 justify-content-center">
        <div class="col-md-8">
          <h2 class="text-center">Author List</h2>
          <ul class="list-group">
            <li
              v-for="author in authors"
              :key="author.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{ author.id }} {{ author.firstName }} {{ author.lastName }}
              <div>
                <button
                  @click="editAuthor(author)"
                  class="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  @click="deleteAuthor(author.id)"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
  } from '../helpers/AxiosAutor';
  
  export default {
    data() {
      return {
        authors: [],
        author: {
          id: null,
          firstName: '',
          lastName: ''
        },
        isEditing: false
      };
    },
    methods: {
      async fetchAuthors() {
        try {
          this.authors = await getAllAuthors();
        } catch (error) {
          console.error('Error fetching authors:', error);
        }
      },
      async saveAuthor() {
        try {
          if (this.isEditing) {
            await updateAuthor(this.author.id, this.author);
          } else {
            await createAuthor(this.author);
          }
          this.resetForm();
          await this.fetchAuthors();
        } catch (error) {
          console.error('Error saving author:', error);
        }
      },
      editAuthor(author) {
        this.author = { ...author };
        this.isEditing = true;
      },
      async deleteAuthor(id) {
        try {
          await deleteAuthor(id);
          await this.fetchAuthors();
        } catch (error) {
          console.error('Error deleting author:', error);
        }
      },
      resetForm() {
        this.author = {
          id: null,
          firstName: '',
          lastName: ''
        };
        this.isEditing = false;
      }
    },
    mounted() {
      this.fetchAuthors();
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales para personalizar el diseño */
  .container {
    max-width: 800px;
  }
  
  .form-control {
    width: 100%;
  }
  
  .btn {
    width: 100%;
  }
  </style>
  