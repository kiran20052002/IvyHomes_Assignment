import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import { logout } from './api';

import Login from './pages/Login';


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  
  if (!token) return null;
  
  return (
    <nav className="glass-card mb-4 flex justify-between items-center" style={{ padding: '1rem 2rem', borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
      <div>
        <button className="btn-primary" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
