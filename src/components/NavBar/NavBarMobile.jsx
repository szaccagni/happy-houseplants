import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBarMobile({ user, setEditInventory, handleLogOut}) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
      setMenuOpen(!menuOpen);
    };

    return (
        <nav>
        <Box sx={{ flexGrow: 1 }} className='nav-bar'>
            <AppBar position="static" className='mobile-nav-bar'>
                <Toolbar style={{display:'flex', justifyContent: 'space-between'}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    style={{color: 'black', transform: 'scale(1.5)'}}
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <div className='nav-title mobile-title'><Link to="">HAPPY HOUSEPLANTS</Link></div>
                {
                    user ? 
                    <div className='nav-right'><Link to="" onClick={handleLogOut}>Log Out</Link></div>
                    : 
                    <div className='nav-right'>
                        <div><Link to="/login">Log In</Link></div> &nbsp; | &nbsp;
                        <div><Link to="/signup">Sign Up</Link></div>
                    </div>
                }
                </Toolbar>
            </AppBar>
        </Box>
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <div className="dropdown-menu">
                <div className='nav-dropdown-item'>
                    <Link to="/search">Browse All</Link>
                </div>
                { user && 
                <>
                    <div className='nav-dropdown-item'>
                        <Link to="/plants" onClick={() => setEditInventory(false)}>Your Inventory</Link>
                    </div>
                    <div className='nav-dropdown-item'>
                        <Link to="/plants" onClick={() => setEditInventory(true)}>Edit Inventory</Link>
                    </div>
                    <div className='nav-dropdown-item'>
                        <Link to="/plants/schedule">Watering Schdeule</Link>
                    </div>
                </>
                }
            </div>
        </Collapse>
        </nav>
    )
}