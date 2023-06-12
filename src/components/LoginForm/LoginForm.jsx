import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import Button from '@mui/material/Button';

export default function LoginForm({ setUser, setShowSignUp, setShowLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  function handleClick() {
    setShowSignUp(true)
    setShowLogin(false)
  }

  return (
    <div>
      <div className="form-container">
        <div>
          <div>
            <input type="text" name="email" value={credentials.email} onChange={handleChange} required placeholder='email'/>
          </div>
          <div>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required placeholder='password'/>
          </div>
          <div className='btn-container'>
            <Button variant="contained" onClick={handleSubmit}>LOG IN</Button>
          </div>
        </div>
      </div>
      <p className="error-message">&nbsp;{error}</p>
      <div className='btn-container'>
        <Button  variant="contained"  onClick={handleClick}>sign up</Button>
      </div>
    </div>
  );
}