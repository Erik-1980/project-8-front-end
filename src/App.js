import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './general/Home';
import Admin from './admin/Admin';
import jwt_decode from "jwt-decode";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now();
    const timeUntilExpiration = decodedToken.exp * 1000 - currentTime;
    if(timeUntilExpiration<0){
      localStorage.clear()
    };
  };

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path='/admin/*' element = {<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
