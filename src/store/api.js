/**
 * Application API Instance
 * @module API
 */

import axios from 'axios';

import { API_STATUS } from '../utilities/enums';

// https://api.themoviedb.org/3/movie/693134?language=en-US

/**
 * Base URL for the Movie Database API.
 * @constant {string}
 */
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * API Access Token for authentication.
 * @constant {string}
 */
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjE1NmFkZjY5ODE2OWY0ZWYyN2U3OTg2ZjlhYjk2ZSIsInN1YiI6IjY0ZmYwY2M3ZTBjYTdmMDEyZWI4MjYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pjiYP9w58lNCnT5niopqKwY1-NLM7_t3kGIr9m9gFG4';

/**
 * Axios instance for making API requests.
 * @const {AxiosInstance}
 */
const api = axios.create({
  baseURL: BASE_URL,
  //   timeout: 5000,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Object containing API request functions.
 * @const {object}
 * @property {function} getMovies - Function to get a list of top-rated movies.
 * @property {function} searchMovie - Function to search for movies based on a query.
 */
const API = {
  /**
   * Function to get a list of top-rated movies.
   * @async
   * @function getMovies
   * @returns {Promise<object>} An object with status and data properties.
   * @throws {Error} If an error occurs during the API request.
   */
  getMovies: async () => {
    try {
      const response = await api.get('/movie/top_rated');

      const { status } = response;
      const { results } = response.data;

      if (status === 200) {
        return {
          status: API_STATUS.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: results,
        };
      } else {
        return {
          status: API_STATUS.ERROR, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: null,
        };
      }
    } catch (error) {
      return {
        status: API_STATUS.ERROR, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
        data: null,
      };
    }
  },

  /**
   * Function to search for movies based on a query.
   * @async
   * @function searchMovie
   * @param {string} query - The search query for movies.
   * @returns {Promise<object>} An object with status and data properties.
   * @throws {Error} If an error occurs during the API request.
   */
  searchMovie: async (query) => {
    try {
      const response = await api.get(
        `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      );

      const { status } = response;
      const { results } = response.data;

      if (status === 200) {
        return {
          status: API_STATUS.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: results,
        };
      } else {
        return {
          status: API_STATUS.ERROR, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: null,
        };
      }
    } catch (error) {
      return {
        status: API_STATUS.ERROR, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
        data: null,
      };
    }
  },
};

export default API;
