import React from 'react';
import AdminSidebar from './components/AdminSidebar';

const UserStats = () => {
  // Sample user data
  const sampleUsers = [
    { id: 1, username: 'user1', email: 'user1@example.com', first_name: 'John', last_name: 'Doe', date_joined: '2023-01-15T10:30:00Z', last_login: '2023-06-20T14:45:00Z', progress_percentage: 75 },
    { id: 2, username: 'user2', email: 'user2@example.com', first_name: 'Jane', last_name: 'Smith', date_joined: '2023-02-20T09:15:00Z', last_login: '2023-06-18T11:30:00Z', progress_percentage: 45 },
    { id: 3, username: 'user3', email: 'user3@example.com', first_name: 'Robert', last_name: 'Johnson', date_joined: '2023-03-10T16:20:00Z', last_login: '2023-06-15T08:45:00Z', progress_percentage: 90 },
    { id: 4, username: 'user4', email: 'user4@example.com', first_name: 'Emily', last_name: 'Williams', date_joined: '2023-04-05T13:10:00Z', last_login: '2023-06-10T17:20:00Z', progress_percentage: 30 },
    { id: 5, username: 'user5', email: 'user5@example.com', first_name: 'Michael', last_name: 'Brown', date_joined: '2023-05-12T11:45:00Z', last_login: '2023-06-05T10:15:00Z', progress_percentage: 60 }
  ];

  // Sample registration data by month
  const sampleRegistrationByMonth = [
    { month: '2023-01', count: 5 },
    { month: '2023-02', count: 8 },
    { month: '2023-03', count: 12 },
    { month: '2023-04', count: 7 },
    { month: '2023-05', count: 10 },
    { month: '2023-06', count: 15 }
  ];

  // Sample stats
  const sampleStats = {
    total_users: sampleUsers.length,
    active_users_30d: 42,
    completion_rate: 68.5,
    completed_items: 137,
    total_progress_items: 200
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">User Statistics</h1>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <h2 className="card-text">{sampleStats.total_users}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">Active Users (30d)</h5>
                  <h2 className="card-text">{sampleStats.active_users_30d}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-white bg-info">
                <div className="card-body">
                  <h5 className="card-title">Completion Rate</h5>
                  <h2 className="card-text">{sampleStats.completion_rate.toFixed(1)}%</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-white bg-warning">
                <div className="card-body">
                  <h5 className="card-title">Completed Items</h5>
                  <h2 className="card-text">{sampleStats.completed_items} / {sampleStats.total_progress_items}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Chart */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">User Registrations by Month</h5>
                </div>
                <div className="card-body">
                  <div className="chart-container" style={{ height: '300px' }}>
                    <div className="d-flex align-items-end" style={{ height: '100%' }}>
                      {sampleRegistrationByMonth.map((item, index) => {
                        const maxCount = Math.max(...sampleRegistrationByMonth.map(i => i.count));
                        const height = (item.count / maxCount) * 100;

                        return (
                          <div
                            key={index}
                            className="mx-2 d-flex flex-column align-items-center"
                            style={{ flex: 1 }}
                          >
                            <div className="text-center mb-1">{item.count}</div>
                            <div
                              className="bg-primary rounded-top"
                              style={{
                                width: '100%',
                                height: `${height}%`,
                                minHeight: '10px'
                              }}
                            ></div>
                            <div className="text-center mt-2 small">{item.month}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">All Users</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Joined</th>
                      <th>Last Login</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{`${user.first_name} ${user.last_name}`.trim() || 'N/A'}</td>
                        <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                        <td>{user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}</td>
                        <td>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${user.progress_percentage}%` }}
                              aria-valuenow={user.progress_percentage}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {user.progress_percentage}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="alert alert-info mt-4">
            <h4 className="alert-heading">Demo Mode</h4>
            <p>This is a demonstration of the User Statistics interface. In a real implementation, the data would be retrieved from a database.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserStats;
