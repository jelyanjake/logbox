function RegPage() {

  const temp = () => {
    alert("WHAT DID I TOLD YOUUU!?!?");
  }
    return (
      <section id="features">
      <div className="container">
        <div className="section-title">
          <form className="registration-form">
            <h2>Register User</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="idnum">School ID Number:</label>
              <input type="text" id="idnum" name="idnum" required />
            </div>
            <button type="submit" className="register-btn" onClick={temp}>Register</button>
            <button type="reset" className="cancel-btn">Cancel</button>
          </form>
        </div>
      </div>
    </section>
    );
  }

  export default RegPage;