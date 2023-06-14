import './NavBar.css'
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        // <nav>
        //     &nbsp;&nbsp; Welcome, {user.name}
        //     &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        // </nav>
        <nav className='nav-bar'>
            <div className='nav-grid '>
                <div className='nav-left'>
                    {user && <div><Link to="/plants">Your Plants</Link></div>}
                    <div><Link to="/search">Browse All</Link></div>
                </div>
                <div className='nav-title'><Link to="">HAPPY HOUSEPLANTS</Link></div>
                {
                    user ? 
                    <div className='nav-right'><Link to="" onClick={handleLogOut}>Log Out</Link></div>
                    : 
                    <div className='nav-right'>
                        <div><Link to="/login">Log In</Link></div> &nbsp; | &nbsp;
                        <div><Link to="/signup">Sign Up</Link></div>
                    </div>
                }
                
            </div>
        </nav>
    )
}