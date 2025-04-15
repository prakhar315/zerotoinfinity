import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { adminService } from '../../services/api';

const ContentManager = () => {
  const [content, setContent] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content_type: 'video',
    url: '',
    description: '',
    order: 0,
    topic: ''
  });

  useEffect(() => {
    fetchTopics();
    fetchContent();
  }, []);

  const fetchTopics = async () => {
    try {
      setError(null); // Clear any previous errors
      console.log('Fetching topics for content manager...');
      const response = await adminService.getAdminTopics();
      console.log('Topics fetched successfully:', response.data);
      setTopics(response.data);
    } catch (err) {
      console.error('Error fetching topics:', err);
      setError(`Failed to load topics: ${err.response?.data?.error || err.message}. Please check your connection and try again.`);
      setTopics([]); // Set empty array instead of sample data
    }
  };

  const fetchContent = async (topicId = null) => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      console.log(`Fetching content${topicId ? ` for topic ${topicId}` : ''}...`);
      const response = await adminService.getAdminContent(topicId);
      console.log('Content fetched successfully:', response.data);
      setContent(response.data);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError(`Failed to load content: ${err.response?.data?.error || err.message}. Please check your connection and try again.`);
      setContent([]); // Set empty array instead of sample data
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (e) => {
    const topicId = e.target.value;
    setSelectedTopic(topicId);
    fetchContent(topicId === '' ? null : topicId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'topic' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const actionType = currentContent ? 'update' : 'create';
      console.log(`Attempting to ${actionType} resource:`, formData);

      let result;
      if (currentContent) {
        result = await adminService.updateContent(currentContent.id, formData);
        console.log('Resource updated successfully:', result.data);
      } else {
        result = await adminService.createContent(formData);
        console.log('Resource created successfully:', result.data);
      }

      // Show success message
      const successMessage = currentContent ? 'Resource updated successfully!' : 'New resource created successfully!';
      alert(successMessage);

      resetForm();
      fetchContent(selectedTopic === '' ? null : selectedTopic);
    } catch (err) {
      console.error('Error saving resource:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
      setError(`Failed to save resource: ${errorMsg}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contentItem) => {
    setCurrentContent(contentItem);
    setFormData({
      title: contentItem.title,
      content_type: contentItem.content_type,
      url: contentItem.url || 'https://example.com',
      description: contentItem.description || '',
      order: contentItem.order,
      topic: contentItem.topic
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        setLoading(true);
        setError(null);
        console.log(`Attempting to delete resource with ID: ${id}`);

        await adminService.deleteContent(id);
        console.log('Resource deleted successfully');
        alert('Resource deleted successfully!');

        fetchContent(selectedTopic === '' ? null : selectedTopic);
      } catch (err) {
        console.error('Error deleting resource:', err);
        const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
        setError(`Failed to delete resource: ${errorMsg}. Please try again.`);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setCurrentContent(null);
    setFormData({
      title: '',
      content_type: 'video',
      url: '',
      description: '',
      order: 0,
      topic: selectedTopic || ''
    });
    setShowForm(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Resource Management</h1>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setShowForm(!showForm)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              {showForm ? 'Cancel' : 'Add New Resource'}
            </button>
          </div>

          {!showForm && (
            <div className="alert alert-info mb-4">
              <div className="d-flex">
                <div className="me-3">
                  <i className="bi bi-lightbulb" style={{ fontSize: '2rem' }}></i>
                </div>
                <div>
                  <h5>How to Manage Resources</h5>
                  <p className="mb-0">Resources are learning materials like videos, exercises, or notes that students can access. Click the "Add New Resource" button above to create a new resource.</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Filter by Topic */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="topicFilter" className="form-label">Filter by Topic</label>
              <select
                className="form-select"
                id="topicFilter"
                value={selectedTopic}
                onChange={handleTopicChange}
              >
                <option value="">All Topics</option>
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Content Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{currentContent ? 'Edit Resource' : 'Add New Resource'}</h5>
              </div>
              <div className="card-body">
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>How to add a resource:</strong> Fill in the details below and click "Save Resource" to add it to the database.
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="topic" className="form-label fw-bold">Step 1: Select Topic</label>
                        <select
                          className="form-select form-select-lg"
                          id="topic"
                          name="topic"
                          value={formData.topic}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- Select a Topic --</option>
                          {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>
                              {topic.title}
                            </option>
                          ))}
                        </select>
                        <div className="form-text">Choose which topic this resource belongs to</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="content_type" className="form-label fw-bold">Step 2: Resource Type</label>
                        <select
                          className="form-select form-select-lg"
                          id="content_type"
                          name="content_type"
                          value={formData.content_type}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- Select Type --</option>
                          <option value="video">Video</option>
                          <option value="exercise">Exercise</option>
                          <option value="notes">Notes</option>
                        </select>
                        <div className="form-text">What kind of resource are you adding?</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 mt-2">
                    <label htmlFor="title" className="form-label fw-bold">Step 3: Resource Title</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter a descriptive title"
                      required
                    />
                    <div className="form-text">Give your resource a clear, descriptive title</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="url" className="form-label fw-bold">Step 4: Resource URL</label>
                    <input
                      type="url"
                      className="form-control form-control-lg"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://example.com/your-resource"
                      required
                    />
                    <div className="form-text">Enter the full URL where this resource can be accessed</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-bold">Step 5: Description (Optional)</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Provide a brief description of this resource"
                    ></textarea>
                    <div className="form-text">Briefly describe what students will learn from this resource</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="order" className="form-label fw-bold">Step 6: Display Order</label>
                    <input
                      type="number"
                      className="form-control"
                      id="order"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                    <div className="form-text">Set the order in which this resource appears (1 = first, 2 = second, etc.)</div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button type="button" className="btn btn-lg btn-secondary" onClick={resetForm}>
                      <i className="bi bi-x-circle me-2"></i> Cancel
                    </button>
                    <button type="submit" className="btn btn-lg btn-success">
                      <i className="bi bi-save me-2"></i> {currentContent ? 'Update Resource' : 'Save Resource'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Resources List */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Your Resources</h5>
            </div>
            <div className="card-body p-0">
              {content.length === 0 && !loading ? (
                <div className="text-center p-5">
                  <i className="bi bi-journal-x" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                  <h4 className="mt-3">No Resources Found</h4>
                  <p className="text-muted">Click the "Add New Content" button above to create your first resource.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Topic</th>
                        <th>Order</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.map(item => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.title}</strong>
                            {item.description && (
                              <div className="small text-muted text-truncate" style={{ maxWidth: '300px' }}>
                                {item.description}
                              </div>
                            )}
                          </td>
                          <td>
                            {item.content_type === 'video' && <span className="badge bg-danger">Video</span>}
                            {item.content_type === 'exercise' && <span className="badge bg-success">Exercise</span>}
                            {item.content_type === 'notes' && <span className="badge bg-info">Notes</span>}
                          </td>
                          <td>{item.topic_title}</td>
                          <td>{item.order}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(item)}
                                title="Edit this resource"
                              >
                                <i className="bi bi-pencil-square"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(item.id)}
                                title="Delete this resource"
                              >
                                <i className="bi bi-trash"></i> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {loading && (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ContentManager;
