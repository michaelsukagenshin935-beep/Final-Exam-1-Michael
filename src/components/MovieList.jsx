import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onDetails, onEdit, onDelete }) => {
  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <p>No movies found. Add some movies to get started!</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDetails={onDetails}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MovieList;
