
import axios from 'axios';
//import dotenv from 'dotenv';
//dotenv.config();

//const apiPrefix = process.env.API_URI;
const apiPrefix = 'http://localhost:3000';

export default {

  listArticles() {
    return axios.get(`${apiPrefix}/articles`).then(response => response.data);
  },

  createArticle(data) {
    return axios.post(`${apiPrefix}/articles`, data);
  },

  updateArticle(id, data) {
    return axios.put(`${apiPrefix}/articles/${id}`, data);
  },

  deleteArticle(id) {
    return axios.delete(`${apiPrefix}/articles/${id}`);
  }

};
