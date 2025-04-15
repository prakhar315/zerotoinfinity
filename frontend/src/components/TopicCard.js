import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const TopicCard = ({ topic }) => {
  const { id, title, description, total_items, progress } = topic;
  
  // Calculate completed items based on progress percentage
  const completedItems = Math.round((progress / 100) * total_items);
  
  return (
    <div className="topic-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <ProgressBar completed={completedItems} total={total_items} />
      <div className="mt-3">
        <Link to={`/topics/${id}`} className="btn btn-primary">
          View Topic
        </Link>
      </div>
    </div>
  );
};

export default TopicCard;
