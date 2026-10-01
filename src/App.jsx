import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import MovieDetail from "./components/MovieDetail";
import { getMovies, createMovie, updateMovie, deleteMovie } from "./services/api";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedRating, setSelectedRating] = useState("Any");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Genre options
  const genres = ["All", "Action", "Animation", "Comedy", "Drama", "Horror", "Science Fiction"];

  // GET - Fetch movies from MockAPI
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter movies based on search, genre, and rating
  const filteredMovies = movies.filter((movie) => {
    // Search filter
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase());

    // Genre filter
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;

    // Rating filter
    let matchesRating = true;
    if (selectedRating === "8+") {
      matchesRating = movie.rating >= 8;
    } else if (selectedRating === "7+") {
      matchesRating = movie.rating >= 7;
    } else if (selectedRating === "6+") {
      matchesRating = movie.rating >= 6;
    }

    return matchesSearch && matchesGenre && matchesRating;
  });

  // POST - Add new movie
  const handleAddMovie = async (movieData) => {
    try {
      const newMovie = await createMovie(movieData);
      setMovies((prevMovies) => [newMovie, ...prevMovies]);
      setShowAddModal(false);
      setError(null);
    } catch (err) {
      setError("Failed to add movie. Please try again.");
      console.error("Error adding movie:", err);
      throw err;
    }
  };

  // PUT/PATCH - Edit movie
  const handleEditMovie = async (movieData) => {
    try {
      const updatedMovie = await updateMovie(selectedMovie.id, movieData);
      setMovies(movies.map((movie) => (movie.id === selectedMovie.id ? updatedMovie : movie)));
      setShowEditModal(false);
      setSelectedMovie(null);
      setError(null);
    } catch (err) {
      setError("Failed to update movie. Please try again.");
      console.error("Error updating movie:", err);
      throw err;
    }
  };

  // DELETE - Delete movie
  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(selectedMovie.id);
      setMovies(movies.filter((movie) => movie.id !== selectedMovie.id));
      setShowDeleteModal(false);
      setSelectedMovie(null);
      setError(null);
    } catch (err) {
      setError("Failed to delete movie. Please try again.");
      console.error("Error deleting movie:", err);
    }
  };

  // Modal handlers
  const handleDetails = (movie) => {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setShowEditModal(true);
  };

  const handleDelete = (movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDetailModal(false);
    setShowDeleteModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-title">
              <h1>My <span className="highlight">Movie</span> Shelf</h1>
              <p className="subtitle">Keep track of everything you've watched and loved.</p>
            </div>
          </div>
          <div className="header-right">
            <button className="btn btn-add" onClick={() => setShowAddModal(true)}>
              + Add movie
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="filters">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search by title or director..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="rating-select"
          >
            <option value="Any">Any rating</option>
            <option value="8+">8+ stars</option>
            <option value="7+">7+ stars</option>
            <option value="6+">6+ stars</option>
          </select>
        </div>

        <div className="genre-filters">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-pill ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <MovieList
          movies={filteredMovies}
          onDetails={handleDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add Movie Modal */}
      {showAddModal && (
        <MovieForm
          onSubmit={handleAddMovie}
          onCancel={closeAllModals}
        />
      )}

      {/* Edit Movie Modal */}
      {showEditModal && (
        <MovieForm
          onSubmit={handleEditMovie}
          onCancel={closeAllModals}
          initialData={selectedMovie}
        />
      )}

      {/* Movie Detail Modal */}
      {showDetailModal && (
        <MovieDetail
          movie={selectedMovie}
          onClose={closeAllModals}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete movie</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={closeAllModals}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <p className="delete-message">
              Are you sure you want to delete "{selectedMovie?.title}"?
            </p>
            <p className="delete-warning">This can't be undone.</p>
            <div className="delete-actions">
              <button className="btn btn-cancel" onClick={closeAllModals}>
                Cancel
              </button>
              <button className="btn btn-delete-confirm" onClick={handleDeleteMovie}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
