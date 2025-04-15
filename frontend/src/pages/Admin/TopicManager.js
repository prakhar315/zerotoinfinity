import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { adminService } from '../../services/api';

const TopicManager = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0,
    parent: null
  });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      console.log('Fetching topics...');
      const response = await adminService.getAdminTopics();
      console.log('Topics fetched successfully:', response.data);
      setTopics(response.data);
    } catch (err) {
      console.error('Error fetching topics:', err);
      setError(`Failed to load topics: ${err.response?.data?.error || err.message}. Please check your connection and try again.`);
      setTopics([]); // Set empty array instead of sample data
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'parent' ? (value === '' ? null : parseInt(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const actionType = currentTopic ? 'update' : 'create';
      console.log(`Attempting to ${actionType} topic:`, formData);

      let result;
      if (currentTopic) {
        result = await adminService.updateTopic(currentTopic.id, formData);
        console.log('Topic updated successfully:', result.data);
      } else {
        result = await adminService.createTopic(formData);
        console.log('Topic created successfully:', result.data);
      }

      // Show success message
      const successMessage = currentTopic ? 'Topic updated successfully!' : 'New topic created successfully!';
      alert(successMessage);

      resetForm();
      fetchTopics();
    } catch (err) {
      console.error('Error saving topic:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
      setError(`Failed to save topic: ${errorMsg}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (topic) => {
    setCurrentTopic(topic);
    setFormData({
      title: topic.title,
      description: topic.description,
      order: topic.order,
      parent: topic.parent
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this topic? This will also delete all associated content.')) {
      try {
        setLoading(true);
        setError(null);
        console.log(`Attempting to delete topic with ID: ${id}`);

        await adminService.deleteTopic(id);
        console.log('Topic deleted successfully');
        alert('Topic deleted successfully!');

        fetchTopics();
      } catch (err) {
        console.error('Error deleting topic:', err);
        const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
        setError(`Failed to delete topic: ${errorMsg}. Please try again.`);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setCurrentTopic(null);
    setFormData({
      title: '',
      description: '',
      order: 0,
      parent: null
    });
    setShowForm(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Topic Management</h1>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setShowForm(!showForm)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              {showForm ? 'Cancel' : 'Add New Topic'}
            </button>
          </div>

          {!showForm && (
            <div className="alert alert-info mb-4">
              <div className="d-flex">
                <div className="me-3">
                  <i className="bi bi-lightbulb" style={{ fontSize: '2rem' }}></i>
                </div>
                <div>
                  <h5>How to Manage Topics</h5>
                  <p className="mb-0">Topics are categories for organizing your learning resources. First create topics, then add resources to them. Click the "Add New Topic" button above to create a new topic.</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Topic Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{currentTopic ? 'Edit Topic' : 'Add New Topic'}</h5>
              </div>
              <div className="card-body">
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>How to add a topic:</strong> Fill in the details below and click "Save Topic" to add it to the database.
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label fw-bold">Step 1: Topic Title</label>
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
                    <div className="form-text">Give your topic a clear, descriptive title</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-bold">Step 2: Description (Optional)</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Provide a brief description of this topic"
                    ></textarea>
                    <div className="form-text">Briefly describe what students will learn in this topic</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="parent" className="form-label fw-bold">Step 3: Parent Topic (Optional)</label>
                    <select
                      className="form-select form-select-lg"
                      id="parent"
                      name="parent"
                      value={formData.parent || ''}
                      onChange={handleChange}
                    >
                      <option value="">None (Main Topic)</option>
                      {topics.map(topic => (
                        // Don't allow a topic to be its own parent
                        currentTopic && topic.id === currentTopic.id ? null : (
                          <option key={topic.id} value={topic.id}>
                            {topic.title}
                          </option>
                        )
                      ))}
                    </select>
                    <div className="form-text">If this is a subtopic, select its parent topic. Leave empty to create a main topic.</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="order" className="form-label fw-bold">Step 4: Display Order</label>
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
                    <div className="form-text">Set the order in which this topic appears (1 = first, 2 = second, etc.)</div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button type="button" className="btn btn-lg btn-secondary" onClick={resetForm}>
                      <i className="bi bi-x-circle me-2"></i> Cancel
                    </button>
                    <button type="submit" className="btn btn-lg btn-success">
                      <i className="bi bi-save me-2"></i> {currentTopic ? 'Update Topic' : 'Save Topic'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Topics List */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Your Topics</h5>
            </div>
            <div className="card-body p-0">
              {topics.length === 0 && !loading ? (
                <div className="text-center p-5">
                  <i className="bi bi-folder-x" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                  <h4 className="mt-3">No Topics Found</h4>
                  <p className="text-muted">Click the "Add New Topic" button above to create your first topic.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Parent Topic</th>
                        <th>Order</th>
                        <th>Resources</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topics.map(topic => (
                        <tr key={topic.id}>
                          <td>
                            <strong>{topic.title}</strong>
                            {topic.description && (
                              <div className="small text-muted text-truncate" style={{ maxWidth: '300px' }}>
                                {topic.description}
                              </div>
                            )}
                          </td>
                          <td>
                            {topic.parent_title ? (
                              <span className="badge bg-secondary">{topic.parent_title}</span>
                            ) : (
                              <span className="badge bg-primary">Main Topic</span>
                            )}
                          </td>
                          <td>{topic.order}</td>
                          <td>
                            <span className="badge bg-info">{topic.content_count} resources</span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(topic)}
                                title="Edit this topic"
                              >
                                <i className="bi bi-pencil-square"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(topic.id)}
                                title="Delete this topic"
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

export default TopicManager;
