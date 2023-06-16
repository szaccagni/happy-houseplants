import { useState } from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser, setEditInventory }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav className='nav-bar'>
            <div className='nav-grid '>
                <div className='nav-left'>
                    <div
                        className='nav-dropdown'
                    >
                        {user && 
                        <>
                            <div className='right-20'><Link to="/plants">Your Plants</Link></div>
                            <div className='nav-dropdown-content'>
                                <div className='nav-dropdown-item'>
                                    <Link to="/plants" onClick={() => setEditInventory(false)}>Your Inventory</Link>
                                </div>
                                <div className='nav-dropdown-item'>
                                    <Link to="/plants" onClick={() => setEditInventory(true)}>Edit Inventory</Link>
                                </div>
                                <div className='nav-dropdown-item'>
                                    <Link to="/plants/schedule">Watering Schdeule</Link>
                                </div>
                            </div>                            
                        </>}
                    </div>
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