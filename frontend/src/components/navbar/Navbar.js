import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import './navbar.css'
import {RxHamburgerMenu} from 'react-icons/rx';
import { useState } from 'react';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [menu, setMenu] = useState(false)

    const openMenu = () => {
        setMenu(true)
    }
    const closeMenu = () => {
        setMenu(false)
    }

    const handleClick = () => {
        logout()
    }

    return (
        <header className='navbarHeader'>
            <div className="navContainer">
                <div className="navLogo">
                    <div><h4 className='logoPlaceholder'>Logo</h4></div>
                    <h2>Ear Training Buddy</h2>
                </div>
                <nav>
                    {/* <div className="user-nav">
                        <Link to="/profile">{user.email}</Link>
                        <span>Hello {user.fName}</span>
                        <button onClick={handleClick}>Log Out</button>
                    </div> */}
                    <RxHamburgerMenu onClick={openMenu} className="menuIcon" />
                    {menu && 
                    <div className="navMenuContainer">
                        <button onClick={closeMenu}>Back</button>
                        <ul>
                            <li onClick={closeMenu}><Link to="/" className="hamburgerLink">Play game</Link></li>
                            <li onClick={closeMenu}><Link to="/tuner" className="hamburgerLink">Tuner</Link></li>
                            <li onClick={closeMenu}><Link to="/profile" className="hamburgerLink">Profile</Link></li>
                            <li onClick={handleClick} className="hamburgerLink">Log out</li>
                        </ul>
                    </div>}
                </nav>
            </div>
        </header>
    )
}

export default Navbar