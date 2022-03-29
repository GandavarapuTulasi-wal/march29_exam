import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [status, setStatus] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const login = (event) => {
    event.preventDefault();
    axios
      .get(
        `/users/checklogin/${event.target.username.value}/${event.target.password.value}`
      )
      .then((res) => {
        console.log(res.data);
        setStatus(res.data.status);
      })
      .catch((error) => {
        console.log(error);
        setStatus(error.status);
      });
  };
  const viewUser = () => {
    axios
      .get('/showuser')
      .then((res) => {
        setUserDetails(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card-container">
      <h1>Login Form</h1>
      <form onSubmit={login} className="box">
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          className="todo-user-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="todo-user-input"
        />

        <button>Login</button>
      </form>
      {status ? (
        <div>
          <button onClick={() => viewUser()}>view user details</button>
          <div>
            {userDetails.map((val, index) => (
              <div>
                <div className="card">
                  <h3>user_id:{val.user_id}</h3>
                  <p>username:{val.username}</p>
                  <p>password:{val.password}</p>
                  <p>date_of_creation:{val.date_of_creation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        'please login'
      )}
    </div>
  );
}
export default Login;
