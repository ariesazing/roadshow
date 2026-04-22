import React, { useState, useEffect } from 'react';
import { updateProfile } from '../services/profileService';

const EditProfile = ({ profile, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_initial: '',
    email: '',
    phone_number: '',
    birthdate: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Populate form with existing profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        middle_initial: profile.middle_initial || '',
        email: profile.email || '',
        phone_number: profile.phone_number || '',
        birthdate: profile.birthdate || '',
      });
    }
  }, [profile]);

  const validateForm = () => {
    const newErrors = {};

    // Validate last_name
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (formData.last_name.length > 50) {
      newErrors.last_name = 'Last name must not exceed 50 characters';
    }

    // Validate first_name
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (formData.first_name.length > 50) {
      newErrors.first_name = 'First name must not exceed 50 characters';
    }

    // Validate middle_initial (optional)
    if (formData.middle_initial && formData.middle_initial.length > 5) {
      newErrors.middle_initial = 'Middle initial must not exceed 5 characters';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone_number (optional)
    if (formData.phone_number && formData.phone_number.length > 20) {
      newErrors.phone_number = 'Phone number must not exceed 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Remove empty optional fields
      const dataToSend = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        ...(formData.middle_initial && { middle_initial: formData.middle_initial.trim() }),
        ...(formData.phone_number && { phone_number: formData.phone_number.trim() }),
        ...(formData.birthdate && { birthdate: formData.birthdate }),
      };

      await updateProfile(profile.id, dataToSend);

      if (onSuccess) {
        onSuccess();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      setApiError(error.message || 'Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Edit Profile - ID {profile?.id}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <div className="modal-body">
            {apiError && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {apiError}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setApiError('')}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="first_name" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    disabled={loading}
                    maxLength="50"
                  />
                  {errors.first_name && (
                    <div className="invalid-feedback d-block">{errors.first_name}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="last_name" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    disabled={loading}
                    maxLength="50"
                  />
                  {errors.last_name && (
                    <div className="invalid-feedback d-block">{errors.last_name}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="middle_initial" className="form-label">
                    Middle Initial
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.middle_initial ? 'is-invalid' : ''}`}
                    id="middle_initial"
                    name="middle_initial"
                    value={formData.middle_initial}
                    onChange={handleChange}
                    placeholder="e.g. J"
                    disabled={loading}
                    maxLength="5"
                  />
                  {errors.middle_initial && (
                    <div className="invalid-feedback d-block">{errors.middle_initial}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    disabled={loading}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    disabled={loading}
                    maxLength="20"
                  />
                  {errors.phone_number && (
                    <div className="invalid-feedback d-block">{errors.phone_number}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="birthdate" className="form-label">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.birthdate && (
                    <div className="invalid-feedback d-block">{errors.birthdate}</div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
