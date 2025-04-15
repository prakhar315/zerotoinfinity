import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { progressService } from '../services/api';
import ProgressBar from '../components/ProgressBar';

const Profile = () => {
  const { currentUser, updateProfile, loading, error } = useAuth();
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
  });
  const [overallProgress, setOverallProgress] = useState({ total_completed: 0, total_items: 0 });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Set initial form data from current user
    setProfileData({
      first_name: currentUser.first_name || '',
      last_name: currentUser.last_name || '',
      email: currentUser.email || '',
      bio: currentUser.bio || '',
    });

    // Fetch overall progress
    const fetchProgress = async () => {
      try {
        setLoadingProgress(true);
        const response = await progressService.getOverallProgress();
        setOverallProgress(response.data);
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    const success = await updateProfile(profileData);
    if (success) {
      setSuccessMessage('Profile updated successfully!');
      window.scrollTo(0, 0);
    }
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="profile-container">
            <h2 className="mb-4">Your Profile</h2>
            
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            
            {(error || formError) && (
              <div className="alert alert-danger" role="alert">
                {formError || error}
              </div>
            )}

            <div className="profile-header mb-4">
              <img
                src={currentUser.profile_image || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="profile-image"
              />
              <div>
                <h3>{currentUser.username}</h3>
                <p className="text-muted">
                  {currentUser.first_name} {currentUser.last_name}
                </p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h4 className="card-title">Your Progress</h4>
                {loadingProgress ? (
                  <div className="text-center my-3">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <ProgressBar
                    completed={overallProgress.total_completed}
                    total={overallProgress.total_items}
                  />
                )}
              </div>
            </div>

            <h4 className="mb-3">Edit Profile</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  rows="3"
                  value={profileData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
