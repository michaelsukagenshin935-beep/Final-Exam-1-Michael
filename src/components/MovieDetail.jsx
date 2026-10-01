import React from "react";

const MovieDetail = ({ movie, onClose }) => {
  if (!movie) return null;

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Image";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-detail" onClick={(e) => e.stopPropagation()}>
        <h2 className="detail-modal-title">{movie.title}</h2>
        <div className="detail-body">
          <div className="detail-image-container">
            <img
              src={movie.image || "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Image"}
              alt={movie.title}
              className="detail-image"
              onError={handleImageError}
            />
          </div>
          <div className="detail-info">
            <p className="detail-field"><strong>Director:</strong> {movie.director}</p>
            <p className="detail-field"><strong>Genre:</strong> {movie.genre}</p>
            <p className="detail-field"><strong>Year:</strong> {movie.release_year}</p>
            <p className="detail-field"><strong>Rating:</strong> ★ {movie.rating} / 10</p>
            <p className="detail-description">{movie.description}</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
