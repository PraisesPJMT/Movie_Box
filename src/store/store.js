// Application Store

import { create } from 'zustand';
import { API_STATUS } from '../utilities/enums';
import API from './api';

const useMovieStore = create((set) => ({
  // Search State
  search: {
    data: null,
    status: API_STATUS.IDLE,
  },

  //   Movies State
  movies: {
    data: null,
    status: API_STATUS.IDLE,
  },

  //   Movie State
  movie: {
    data: null,
    status: API_STATUS.IDLE,
  },

  //   Get Movie
  getMovie: (movieId) => {},

  //   Get Movies
  getMovies: async () => {
    set((state) => ({
      ...state,
      movies: {
        ...state.movies,
        status: API_STATUS.LOADING,
      },
    }));

    const { data, status } = await API.getMovies();

    set((state) => ({
      ...state,
      movies: {
        ...state.movies,
        status,
        data: data ? data.slice(0, 10) : data,
      },
    }));
  },

  //   Search for movies
  searchMovies: async (query) => {
    set((state) => ({
      ...state,
      search: {
        ...state.search,
        status: API_STATUS.LOADING,
      },
    }));

    const { data, status } = await API.searchMovie(query);

    set((state) => ({
      ...state,
      search: {
        ...state.search,
        status,
        data,
      },
    }));
  },
}));

export default useMovieStore;
