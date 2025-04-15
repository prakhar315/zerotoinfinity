import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { topicService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import ContentItem from '../components/ContentItem';
import ProgressBar from '../components/ProgressBar';

const TopicDetail = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchTopic = async () => {
      try {
        setLoading(true);
        const response = await topicService.getTopic(topicId);
        setTopic(response.data);
      } catch (err) {
        console.error('Failed to fetch topic:', err);
        setError('Failed to load topic. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId, currentUser, navigate]);

  const handleProgressUpdate = (contentId, completed) => {
    // Update local state to reflect progress change
    if (topic) {
      const updatedContents = topic.contents.map(content => 
        content.id === contentId ? { ...content, completed } : content
      );
      
      // Calculate new progress
      const completedCount = updatedContents.filter(c => c.completed).length;
      const newProgress = topic.total_items > 0 
        ? Math.round((completedCount / topic.total_items) * 100) 
        : 0;
      
      setTopic({
        ...topic,
        contents: updatedContents,
        progress: newProgress
      });
    }
  };

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

  if (!topic) {
    return (
      <div className="alert alert-warning my-3" role="alert">
        Topic not found.
      </div>
    );
  }

  // Calculate completed items based on progress percentage
  const completedItems = Math.round((topic.progress / 100) * topic.total_items);

  return (
    <div className="container">
      <div className="mb-4">
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
        <ProgressBar completed={completedItems} total={topic.total_items} />
      </div>

      {topic.subtopics && topic.subtopics.length > 0 && (
        <div className="subtopic-list mb-4">
          <h3>Subtopics</h3>
          <div className="row">
            {topic.subtopics.map(subtopic => (
              <div className="col-md-6 mb-3" key={subtopic.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{subtopic.title}</h5>
                    <p className="card-text">{subtopic.description}</p>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => navigate(`/topics/${subtopic.id}`)}
                    >
                      View Subtopic
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="content-list">
        <h3>Content</h3>
        {topic.contents && topic.contents.length > 0 ? (
          topic.contents.map(content => (
            <ContentItem 
              key={content.id} 
              content={content} 
              onProgressUpdate={handleProgressUpdate}
            />
          ))
        ) : (
          <p>No content available for this topic yet.</p>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
