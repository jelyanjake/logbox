import { useState, useEffect } from 'react';
import './App.css';
import usersIcon from './assets/users.png';
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <nav>
            <a href="#" className="logo">&#128223; Exhibit Registration System</a>
            <ul className="nav-links">
              <li><a href="#"><img src={usersIcon}></img></a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section id="features">
          <div className="container">
            <div className="section-title">
              <form className="registration-form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="idnum">Student ID Number:</label>
                  <input type="text" id="idnum" name="idnum" required />
                </div>
                <button type="submit" className="register-btn">Register</button>
                <button type="button" className="cancel-btn">Cancel</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Group 1 | Time Log Box w/ SMS Broadcasting | BSIT - 3A</p>
        </div>
      </footer>
    </div>
  );
}

export default App;