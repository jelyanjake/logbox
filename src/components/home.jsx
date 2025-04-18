function HomePage() {

    return (
      <section id="features">
      <div className="container">
        <div className="section-title">
          <form className="time-form">
            <div className="form-group">
              <label htmlFor="idnum">School ID Number:</label>
              <input type="text" id="idnum" name="idnum" autoFocus autoComplete="off" required />
            </div>
            <button type="submit" className="time-btn">Time in/out</button>
          </form>
        </div>
      </div>
    </section>
    );
  }

  export default HomePage;