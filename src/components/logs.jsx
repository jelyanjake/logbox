import { useState, useEffect } from 'react';
import { LogsModal } from './LogsModal';
import './logs.css';
import { PasswordModal } from './PasswordModal';
import { EditModal } from './EditModal';
import StatusModal from './StatusModal';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserLogs, setSelectedUserLogs] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Fetch users only after authentication
    if (isAuthenticated) {
      const fetchUsers = async () => {
        try {
          const response = await fetch('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users');
          const data = await response.json();
          setUsers(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching users:', error);
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isAuthenticated]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.idnum.includes(searchTerm)
  );

  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setStatus('loading');
      setStatusMessage('Deleting user...');
      try {
        await fetch(`https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users/${userId}`, {
          method: 'DELETE'
        });
        setUsers(users.filter(user => user.id !== userId));
        setStatus('success');
        setStatusMessage('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        setStatus('error');
        setStatusMessage('Failed to delete user');
      }
    }
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  };

  const handleSaveUser = async (userId, updatedData) => {
    setEditingUser(null);
    setStatus('loading');
    setStatusMessage('Updating user...');
  try {
    const response = await fetch(
      `https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users/${userId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      }
    );
    
    if (!response.ok) throw new Error('Failed to update user');
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    ))
    setStatus('success');
    setStatusMessage('User updated successfully');
  } catch (error) {
    setStatus('error');
    setStatusMessage('Failed to update user');
  }
  setTimeout(() => {
    setStatus(null);
  }, 2000);
};

  if (!isAuthenticated) {
    return (
      <PasswordModal 
        onSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <section id="users">
      <div className="container">
        <div className="section-title">
          <div className="userlog">
            <h2>User Statistics</h2>
            <div className="parent">
              <div className="div1">
                <p>{users.length}</p>
                <p>Number of Users</p>
              </div>
              <div className="div2">
                <p>{activeUsers}</p>
                <p>Active</p>
              </div>
              <div className="div3">
                <p>{inactiveUsers}</p>
                <p>Inactive</p>
              </div>
              <div className="div4">
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <hr />
            
            {loading ? (
              <div className='loading-spinner'></div>
            ) : (
              <div className="user-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID Number</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Last Action</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.idnum}</td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{user.lastAction ? new Date(user.lastAction).toLocaleString() : 'Never'}</td>
                        <td>
                          <button className="view-btn" onClick={() => setSelectedUserLogs(user.logs || [])}>View Logs</button>
                          <button className="view-btn" onClick={() => setEditingUser(user)}>Edit User</button>
                          <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedUserLogs !== null && (
        <LogsModal 
          logs={selectedUserLogs} 
          onClose={() => setSelectedUserLogs(null)} 
        />
      )}
      {editingUser && (
  <EditModal
    user={editingUser}
    onClose={() => setEditingUser(null)}
    onSave={handleSaveUser}
  />
)}
<StatusModal
        status={status}
        message={statusMessage}
        onClose={() => setStatus(null)}
      />
    </section>
  );
}

export default UsersPage;