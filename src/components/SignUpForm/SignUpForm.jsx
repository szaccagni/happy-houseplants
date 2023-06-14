import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function SignUpForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setError('');
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirm') {
      setConfirm(value);
    }
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = {
        name: name,
        email: email,
        password: password
      }
      const user = await signUp(formData)
      props.setUser(user);
      navigate('/plants');
    } catch {
      setError('Sign Up Failed - Try Again');
    }
  }

  const disable = password !== confirm;

  return (
    <div>
      <div className="form-container">
        <div><img alt="flowers" src='/flowers-wide.png'></img></div>
        <div>
          <div>
            <input type="text" name="name" value={name} onChange={handleChange} placeholder='name' required />
          </div>
          <div>
            <input type="email" name="email" value={email} onChange={handleChange} placeholder='email' required />
          </div>
          <div>
            <input type="password" name="password" value={password} onChange={handleChange} placeholder='password' required />
          </div>
          <div>
            <input type="password" name="confirm" value={confirm} onChange={handleChange} placeholder='confirm password' required />
          </div>
          <div className='btn-container'>
            <Button variant="contained" disabled={disable} onClick={handleSubmit}>SIGN UP</Button>
          </div>
        </div>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
