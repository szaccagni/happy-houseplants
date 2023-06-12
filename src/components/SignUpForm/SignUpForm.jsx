import { Component } from 'react'
import { signUp } from '../../utilities/users-service'
import Button from '@mui/material/Button';

export default class SignUpForm extends Component {
  state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
  }

  handleChange = (evt) => {
      this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
      })
  }

  handleSubmit = async (evt) => {
      evt.preventDefault();
      try {
        const formData = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
        const user = await signUp(formData)
        this.props.setUser(user)
      } catch {
        this.setState({ error: 'Sign Up Failed - Try Again' })
      }
  } 

  handleClick = () => {
    this.props.setShowLogin(true)
    this.props.setShowSignUp(false)
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <div>
            <div>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder='name' required />
            </div>
            <div>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder='email' required />
            </div>            
            <div>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder='password' required />
            </div>
            <div>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} placeholder='confirm password' required />
            </div>
            <div className='btn-container'>
              <Button variant="contained" disabled={disable} onClick={this.handleSubmit}>SIGN UP</Button>
            </div>
          </div>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
        <div className='btn-container'>
          <Button variant="contained" onClick={this.handleClick}>log in</Button>
        </div>
      </div>
    );
  }
}