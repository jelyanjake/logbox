import { useState } from 'react';
import StatusModal from './StatusModal';

function HomePage() {
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [idNum, setIdNum] = useState(''); // Add state for the input value

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('Validating...');
    
    setTimeout(() => {
    setStatus('success');
    setStatusMessage('Successfully Scanned!');
    setIdNum('');
    }, 1500);

    setTimeout(() => {
      setStatus(null);
      setIdNum('');
    }, 2500);
  }

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
                value={idNum} // Controlled input
                onChange={(e) => setIdNum(e.target.value)} // Update state on change
                autoFocus 
                autoComplete="off" 
                required 
              />
            </div>
            <button type="submit" className="time-btn">Time in/out</button>
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