import React, { useState, useEffect } from 'react';
import { fetchAllProfiles } from '../services/profileService';
import AddProfile from './AddProfile';
import EditProfile from './EditProfile';
import DeleteConfirmation from './DeleteConfirmation';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedProfileForDelete, setSelectedProfileForDelete] = useState(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAllProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err.message || 'Failed to load profiles');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProfileSuccess = () => {
    setShowAddModal(false);
    loadProfiles();
  };

  const handleOpenEditModal = (profile) => {
    setSelectedProfile(profile);
    setShowEditModal(true);
  };

  const handleEditProfileSuccess = () => {
    setShowEditModal(false);
    setSelectedProfile(null);
    loadProfiles();
  };

  const handleOpenDeleteModal = (profile) => {
    setSelectedProfileForDelete(profile);
    setShowDeleteModal(true);
  };

  const handleDeleteProfileSuccess = () => {
    setShowDeleteModal(false);
    setSelectedProfileForDelete(null);
    loadProfiles();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <h2>Profiles</h2>
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Profile
          </button>
        </div>
      </div>

      {showAddModal && (
        <AddProfile
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddProfileSuccess}
        />
      )}

      {showEditModal && selectedProfile && (
        <EditProfile
          profile={selectedProfile}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProfile(null);
          }}
          onSuccess={handleEditProfileSuccess}
        />
      )}

      {showDeleteModal && selectedProfileForDelete && (
        <DeleteConfirmation
          profile={selectedProfileForDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProfileForDelete(null);
          }}
          onSuccess={handleDeleteProfileSuccess}
        />
      )}

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

      {profiles.length === 0 ? (
        <div className="alert alert-info">
          No profiles found. <button className="btn btn-link">Create one now</button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Middle Initial</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Birthdate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.id}</td>
                  <td>{profile.first_name}</td>
                  <td>{profile.last_name}</td>
                  <td>{profile.middle_initial || '-'}</td>
                  <td>{profile.email}</td>
                  <td>{profile.phone_number}</td>
                  <td>{profile.birthdate ? new Date(profile.birthdate).toLocaleDateString() : '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2">
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleOpenEditModal(profile)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleOpenDeleteModal(profile)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profiles;
