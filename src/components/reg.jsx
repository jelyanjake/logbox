import { useState } from 'react';
import StatusModal from './StatusModal';

function RegPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idnum: ''
  });

  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('loading');
  setStatusMessage('Validating...');

  try {
    // Submit to API
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        idnum: formData.idnum
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');

    setStatus('success');
    setStatusMessage('Registration successful!');
    setFormData({ name: '', phone: '', idnum: '' });

  } catch (err) {
    setStatus('error');
    setStatusMessage(err.message);
  }
};

  return (
    <section id="features">
      <div className="container">
        <div className="section-title">
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2>Register User</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="idnum">School ID Number:</label>
              <input
                type="text"
                id="idnum"
                name="idnum"
                autoComplete='off'
                value={formData.idnum}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="register-btn"
              >Register</button>
              <button 
                type="reset" 
                className="cancel-btn"
                onClick={() => setFormData({ name: '', phone: '', idnum: '' })}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <StatusModal
        status={status}
        message={statusMessage}
        onClose={() => setStatus(null)}
      />
    </section>
  );
}

export default RegPage;