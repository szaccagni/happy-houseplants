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

    function handleMenuClick() {
      setMenuOpen(!menuOpen);
    };

    function handleLinkClick() {
        setMenuOpen(false);
    };

    return (
        <nav>
        <Box sx={{ flexGrow: 1 }} className='nav-bar'>
            <AppBar position="static" className='mobile-nav-bar'>
                <Toolbar className='mobile-nav-bar-style'>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    style={{color: 'black', transform: 'scale(1.5)', marginRight:'25px'}}
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <div className='nav-title mobile-title'><Link to="">HAPPY HOUSEPLANTS</Link></div>
                </Toolbar>
            </AppBar>
        </Box>
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <div className="dropdown-menu">
                <div>
                    <Link className='nav-dropdown-item' to="/search" onClick={handleLinkClick}>Browse All</Link>
                </div>
                { user ? 
                <>
                    <div>
                        <Link className='nav-dropdown-item' to="/plants" onClick={() => { setEditInventory(false); handleLinkClick(); }}>Your Inventory</Link>
                    </div>
                    <div>
                        <Link className='nav-dropdown-item' to="/plants" onClick={() => { setEditInventory(true); handleLinkClick(); }}>Edit Inventory</Link>
                    </div>
                    <div>
                        <Link className='nav-dropdown-item' to="/plants/schedule" onClick={handleLinkClick}>Watering Schdeule</Link>
                    </div>
                    <div>
                        <Link className='nav-dropdown-item' to="" onClick={() => { handleLinkClick(); handleLogOut(); }}>Log Out</Link>
                    </div>
                </>
                : 
                <>
                    <div>
                        <Link className='nav-dropdown-item' to="/login" onClick={handleLinkClick}>Log In</Link>
                    </div>
                    <div>
                    <Link className='nav-dropdown-item' to="/signup" onClick={handleLinkClick}>Sign Up</Link>
                    </div>
                </>
                }
            </div>
        </Collapse>
        </nav>
    )
}