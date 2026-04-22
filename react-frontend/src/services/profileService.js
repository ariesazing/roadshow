import { authenticatedFetch } from './authService';

const API_URL = 'https://zionhill-enterprise-pos.online/api';

export const fetchAllProfiles = async () => {
  try {
    const response = await authenticatedFetch(`${API_URL}/profiles`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profiles');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export const getProfileById = async (id) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/profiles/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const createProfile = async (profileData) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/profiles`, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to create profile');
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

export const updateProfile = async (id, profileData) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const deleteProfile = async (id) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/profiles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};
