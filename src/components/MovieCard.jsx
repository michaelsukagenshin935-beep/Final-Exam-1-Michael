import React from "react";

const MovieCard = ({ movie, onDetails, onEdit, onDelete }) => {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Image";
  };

  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <img
          src={movie.image || "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Image"}
          alt={movie.title}
          className="movie-image"
          onError={handleImageError}
        />
        <div className="rating-badge">{movie.rating}</div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-director">Director: {movie.director}</p>
        <p className="movie-year">Year: {movie.release_year}</p>
        <span className="genre-badge">{movie.genre}</span>
      </div>
      <div className="movie-actions">
        <button className="btn btn-details" onClick={() => onDetails(movie)}>
          Details
        </button>
        <button className="btn btn-edit" onClick={() => onEdit(movie)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(movie)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
