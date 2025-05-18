import { useState } from 'react';
import NewModal from './newmodal';
import { sendSMS } from './sms';
import { useRef } from 'react';

function HomePage() {
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [idNum, setIdNum] = useState('');
  const [userImage, setUserImage] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('Processing...');

    try {
      // 1. Find user by ID
      const findResponse = await fetch(
        `https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users`
      );
      const users = await findResponse.json();
  
      // 2. Find EXACT match (not partial)
      const user = users.find(u => u.idnum === idNum); // Changed to exact comparison

      if (!user) throw new Error('Student ID not found');
      const currentTime = new Date().toISOString();
      const isTimeIn = !user.isActive; // Determine action based on isActive

      setUserImage(user.avatar);

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
        //await sendSMS(user.phone, `Hello ${user.name}, this is kim minjeong. i am here to inform you that you have timed out at ${new Date(currentTime).toLocaleTimeString()}. one look give em whiplashhh~`);
        await sendSMS(user.phone, `Hello ${user.name}, You have timed out at ${new Date(currentTime).toLocaleTimeString()}. Thank you and have a great day!`);
      } else {
        //await sendSMS(user.phone, `Hello ${user.name}, this is yu jimin. i am here to inform you that you have timed in at ${new Date(currentTime).toLocaleTimeString()}. imma get it done(armageddon) aw wayo wayo~`);
        await sendSMS(user.phone, `Hello ${user.name}, Welcome to University of Cebu! You have timed in at ${new Date(currentTime).toLocaleTimeString()}.`);
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
      setStatus('success');
      setStatusMessage(isTimeIn
          ? `Hello, ${user.name}! You have Timed in successfully at ${new Date(currentTime).toLocaleTimeString()}`
          : `Goodbye, ${user.name}! You have Timed out. ${new Date(currentTime).toLocaleTimeString()}`,
      );
    } catch (err) {
      setStatus('error');
      setStatusMessage(err.message);
    }
    setTimeout(() => {
        setStatus(null);
        setIdNum('');
        if (inputRef.current) {
          inputRef.current.focus();
        }
    }, 3000);
  };

  return (
    <section id="features">
      <div className="container">
        <div className="section-title">
          <form className="time-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="idnum">School ID Number:</label>
              <input
                ref={inputRef} 
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
      <NewModal
        status={status}
        message={statusMessage}
        onClose={() => setStatus(null)}
        userImage={userImage}
      />
    </section>
  );
}

export default HomePage;