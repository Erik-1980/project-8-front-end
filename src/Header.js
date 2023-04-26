import { Link } from 'react-router-dom';
import LoginRegister from './LoginRegister';
import { useState } from 'react';
import {admin} from './Setting'

export default function Header() {
  const [showForm, setShowForm] = useState();

  const email = localStorage.getItem('email');  

  return (
    <header>
      <div className="header">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/catalog'>Catalog</Link></li>
          <li><Link to='/about'>About</Link></li>
          {admin  && <li><Link to='/admin'>Admin</Link></li>}
          {email ? ( 
            <button onClick={() => setShowForm(true)} className='modal-button'>Logout</button>
          ) : (
            <button onClick={() => setShowForm(true)} className='modal-button'>Login</button>
          )}
        </ul> 
      </div>
      <div><h1 className="containerheader">WELCOME TO HOME APPLIANCES CENTER</h1></div>
      <h1 className='logoheader'>RELQ</h1>
      {showForm && (
        <div className="modal">
          <LoginRegister />
          <button onClick={() => setShowForm(false)}>Close</button>
        </div>
      )}
      
    </header>
  );
}
