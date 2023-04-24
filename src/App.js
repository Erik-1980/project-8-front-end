import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Admin from './admin/Admin';


function App() {

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
