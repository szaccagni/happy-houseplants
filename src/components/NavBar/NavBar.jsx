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
        <nav>
            <div className='nav-grid '>
                <div className='nav-left'>
                    <div>Your Plants</div>
                    <div>Search</div>
                </div>
                <div className='nav-title'>HAPPY HOUSEPLANTS</div>
                <div className='nav-right'><Link to="" onClick={handleLogOut}>Log Out</Link></div>
            </div>
        </nav>
    )
}