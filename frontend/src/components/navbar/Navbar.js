import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import './navbar.css'
import {RxHamburgerMenu} from 'react-icons/rx';
import {AiOutlineClose} from 'react-icons/ai';
import { useState } from 'react';
import logo from '../../images/logo9.jpg';

const Navbar = () => {
    const { logout } = useLogout()
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
            <div className="navLogo">
                <img src={logo} alt="Logo" />
                <h2>Ear Training Buddy</h2>
            </div>
            <nav className={menu ? "navMenuContainer active" : "navMenuContainer"}>
                    <ul>
                        <li onClick={closeMenu}><Link to="/" className="navLink">Play game</Link></li>
                        <li onClick={closeMenu}><Link to="/tuner" className="navLink">Tuner</Link></li>
                        <li onClick={closeMenu}><Link to="/profile" className="navLink">Profile</Link></li>
                        <li onClick={handleClick} className="navLink">Log out</li>
                    </ul>
                {!menu ? <RxHamburgerMenu onClick={openMenu} className="menuIcon" /> : <AiOutlineClose className="menuIcon" onClick={closeMenu} /> }
            </nav>
        </header>
    )
}

export default Navbar