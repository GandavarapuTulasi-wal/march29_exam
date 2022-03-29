import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Routes, BrowserRouter, Route, Link } from 'react-router-dom';
import Registartion from './Registration';
import Login from './Login';
import Registration from './Registration';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <div>
            <h1 className="heading">Car Rental app</h1>
          </div>
          <div className="nav">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/register" className="link">
              Registartion
            </Link>
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
