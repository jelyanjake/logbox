import { useState } from 'react';
import StatusModal from './StatusModal';

function HomePage() {
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [idNum, setIdNum] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('Processing...');

    try {
      // 1. Find user by ID
      const findResponse = await fetch(
        `https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users?idnum=${idNum}`
      );
      const users = await findResponse.json();

      if (!users.length) throw new Error('Student ID not found');
      const user = users[0];
      const currentTime = new Date().toISOString();
      const isTimeIn = !user.isActive; // Determine action based on isActive

      // 2. Prepare updated data
      const updatedData = {
        ...user,
        lastAction: currentTime, // Always update lastAction
        isActive: isTimeIn, // Toggle active status
        logs: user.logs || [] // Initialize logs array if undefined
      };

      // 3. Add to logs if timing out
      if (!isTimeIn) {
        updatedData.logs = [
          ...updatedData.logs,
          {
            timein: user.timein,
            timeout: currentTime,
            date: currentTime.split('T')[0] // Store just the date
          }
        ];
        updatedData.timein = null; // Reset timein
        updatedData.timeout = null; // Reset timeout
      } else {
        updatedData.timein = currentTime; // Set timein
      }

      // 4. Update user record
      const updateResponse = await fetch(
        `https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        }
      );

      if (!updateResponse.ok) throw new Error('Update failed');

      // 5. Clear input and show success
      setIdNum('');
      setStatus('success');
      setStatusMessage(
        isTimeIn 
          ? `Time in recorded at ${new Date(currentTime).toLocaleTimeString()}`
          : `Time out recorded. Session logged.`
      );
    } catch (err) {
      setStatus('error');
      setStatusMessage(err.message);
    }
  };

  return (
    <section id="features">
      <div className="container">
        <div className="section-title">
          <form className="time-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="idnum">School ID Number:</label>
              <input 
                type="text" 
                id="idnum" 
                name="idnum" 
                value={idNum}
                onChange={(e) => setIdNum(e.target.value)}
                autoFocus 
                autoComplete="off" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="time-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Processing...' : 'Time in/out'}
            </button>
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

export default HomePage;