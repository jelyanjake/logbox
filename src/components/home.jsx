function HomePage() {

  const temp = () => {
    alert("This don't work yet cuhzz go back later huhu 💔💔");
  }
    return (
      <section id="features">
      <div className="container">
        <div className="section-title">
          <form className="time-form">
            <div className="form-group">
              <label htmlFor="idnum">School ID Number:</label>
              <input type="text" id="idnum" name="idnum" required />
            </div>
            <button type="submit" className="time-btn" onClick={temp}>Time in/out</button>
          </form>
        </div>
      </div>
    </section>
    );
  }

  export default HomePage;