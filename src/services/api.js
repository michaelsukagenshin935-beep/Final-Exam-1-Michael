import axios from "axios";

const api = axios.create({
  baseURL: "https://6ab3bbe1217e4365883149d3.mockapi.io/Movies",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET - Ambil semua movie
export const getMovies = async () => {
  const response = await api.get("/");
  return response.data;
};

// GET - Ambil satu movie berdasarkan ID
export const getMovieById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// POST - Tambah movie baru
export const createMovie = async (movieData) => {
  const response = await api.post("/", movieData);
  return response.data;
};

// PUT - Update movie berdasarkan ID
export const updateMovie = async (id, movieData) => {
  const response = await api.put(`/${id}`, movieData);
  return response.data;
};

// DELETE - Hapus movie berdasarkan ID
export const deleteMovie = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export default api;