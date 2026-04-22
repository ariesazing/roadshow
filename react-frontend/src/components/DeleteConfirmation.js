import React, { useState } from 'react';
import { deleteProfile } from '../services/profileService';

const DeleteConfirmation = ({ profile, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setError('');
    setLoading(true);

    try {
      await deleteProfile(profile.id);
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete profile. Please try again.');
      console.error('Error deleting profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Delete Profile</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <div className="modal-body">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError('')}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <div className="alert alert-warning mb-4" role="alert">
              <strong>Warning!</strong> This action cannot be undone.
            </div>

            <p className="mb-2">
              Are you sure you want to delete this profile?
            </p>

            <div className="card bg-light">
              <div className="card-body">
                <p className="mb-1">
                  <strong>ID:</strong> {profile?.id}
                </p>
                <p className="mb-1">
                  <strong>Name:</strong> {profile?.first_name} {profile?.last_name}
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> {profile?.email}
                </p>
              </div>
            </div>
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
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Deleting...
                </>
              ) : (
                'Yes, Delete Profile'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
