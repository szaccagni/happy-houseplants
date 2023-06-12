import './AuthPage.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import { useState } from 'react'
import Button from '@mui/material/Button';

export default function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <main className='auth-page'>
            <img src='/happy-houseplants-logo-large.png' alt="happy-houseplants-logo"></img>
            {showLogin && <LoginForm setUser={setUser} setShowSignUp={setShowSignUp} setShowLogin={setShowLogin}/>}
            {showSignUp && <SignUpForm setUser={setUser} setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />}
            { !showLogin && !showSignUp &&
                <div className='btn-container'>
                    <Button variant="contained" onClick={() => setShowLogin(true)}>Log In</Button> 
                    <Button variant="contained">Sign Up</Button>
                </div>
            }
        </main>
    )
}