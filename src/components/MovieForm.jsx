import React, { useState, useEffect } from "react";

const MovieForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    genre: "",
    release_year: "",
    rating: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        director: initialData.director || "",
        genre: initialData.genre || "",
        release_year: initialData.release_year !== undefined ? String(initialData.release_year) : "",
        rating: initialData.rating !== undefined ? String(initialData.rating) : "",
        description: initialData.description || "",
        image: initialData.image || "",
      });
      setImageError(false);
    } else {
      setFormData({
        title: "",
        director: "",
        genre: "",
        release_year: "",
        rating: "",
        description: "",
        image: "",
      });
      setImageError(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") {
      setImageError(false);
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.director.trim()) {
      newErrors.director = "Director is required";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.release_year) {
      newErrors.release_year = "Release year is required";
    } else if (isNaN(formData.release_year) || Number(formData.release_year) <= 0) {
      newErrors.release_year = "Valid year required";
    }

    if (formData.rating === "" || formData.rating === null) {
      newErrors.rating = "Rating is required";
    } else if (isNaN(formData.rating) || Number(formData.rating) < 0 || Number(formData.rating) > 10) {
      newErrors.rating = "Rating must be 0-10";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitData = {
      ...formData,
      release_year: Number(formData.release_year),
      rating: Number(formData.rating),
    };

    try {
      setIsSubmitting(true);
      await onSubmit(submitData);
    } catch (error) {
      console.error("Error submitting movie form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {initialData ? "Edit movie" : "Add a movie"}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Interstellar"
              disabled={isSubmitting}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="director">Director</label>
            <input
              id="director"
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              placeholder="Christopher Nolan"
              disabled={isSubmitting}
            />
            {errors.director && <span className="error">{errors.director}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                id="genre"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Pick or type"
                disabled={isSubmitting}
              />
              {errors.genre && <span className="error">{errors.genre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="release_year">Release year</label>
              <input
                id="release_year"
                type="number"
                name="release_year"
                value={formData.release_year}
                onChange={handleChange}
                placeholder="2014"
                disabled={isSubmitting}
              />
              {errors.release_year && (
                <span className="error">{errors.release_year}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (0–10)</label>
            <input
              id="rating"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="8.7"
              step="0.1"
              min="0"
              max="10"
              disabled={isSubmitting}
            />
            {errors.rating && <span className="error">{errors.rating}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter movie description..."
              rows="3"
              disabled={isSubmitting}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <div className="image-input-container">
              <input
                id="image"
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                disabled={isSubmitting}
              />
              <div className="compact-image-preview">
                {formData.image.trim() && !imageError ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="preview-placeholder">Preview</span>
                )}
              </div>
            </div>
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? initialData
                  ? "Saving..."
                  : "Adding..."
                : initialData
                ? "Update movie"
                : "Add movie"}
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
