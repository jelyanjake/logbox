import './logs.css';

function UsersPage() {
    return (
      <section id="users">
        <div className="container">
          <div className="section-title">
            <div className="userlog">
            <h2>User Statistics</h2>
              <div class="parent">
                <div class="div1">
                  <p>5</p>
                  <p>Number of Users</p>
                </div>
                <div class="div2">
                <p>5</p>
                <p>Active</p>
                </div>
                <div class="div3">
                <p>5</p>
                <p>Inactive</p>
                </div>
                <div class="div4">
                <p>Search Bar</p>
                </div>
              </div>
              <hr />
            <p>user list something with delete buttons</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default UsersPage;