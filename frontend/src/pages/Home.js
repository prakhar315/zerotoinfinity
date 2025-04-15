import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { topicService, progressService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import TopicCard from '../components/TopicCard';
import ProgressBar from '../components/ProgressBar';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [overallProgress, setOverallProgress] = useState({ total_completed: 0, total_items: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Fetch topics and overall progress
    const fetchData = async () => {
      try {
        setLoading(true);
        const [topicsResponse, progressResponse] = await Promise.all([
          topicService.getTopics(),
          progressService.getOverallProgress(),
        ]);
        setTopics(topicsResponse.data);
        setOverallProgress(progressResponse.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-3" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Overall Progress</h2>
              <ProgressBar
                completed={overallProgress.total_completed}
                total={overallProgress.total_items}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-4">Math Topics</h2>
      <div className="row">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div className="col-md-6 col-lg-4 mb-4" key={topic.id}>
              <TopicCard topic={topic} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No topics available yet. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
