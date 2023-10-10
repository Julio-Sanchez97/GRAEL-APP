import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Form from './components/Form/Form';
import NavbarComponent from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const rol = localStorage.getItem("userRole");

  return (
    <div className="app">
      {location.pathname !== "/" && <NavbarComponent />}
      <Routes>
        <Route path='/' element={<Login />} />
        {isAuthenticated ? (
          <>
            <Route path='/user/form' element={<Form />} />
            {rol==="admin"
              ?<Route path='/admin/dashboard' element={<Dashboard />}/>
              :null
            }  
          </>
        ) : (
          <Route path='/user/form' element={<Navigate to={"/"}/>} />
        )}
      </Routes>
    </div>
  );
}

export default App;
