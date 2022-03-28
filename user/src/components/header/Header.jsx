import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import "../../css/header.css";
import PBudget from "../../img/PBudget.svg";
import { useSession } from '../../hooks/useSession';

function Header () {

    let [isValid, setIsValid] = useState(false);
    const { sessionOut } = useSession();
    
    //useRef
    let v_dMenu = useRef();
    let v_burguerMenu = useRef();

    //Funcionalidad del menú desplegable
    const toggleMenu = (v_ref) => {
        v_ref.current.classList.toggle("toggle-dropdown-menu");
    }

    const vSession = () => {
        localStorage.key("pbst") || sessionStorage.key("pbst") ? setIsValid(true) : setIsValid(false);
    }

    useEffect(() => {
        vSession()
    }, [vSession])

    return (
        <header className='header'>
            <Link to="/"><img className='logo-header' src={PBudget} alt="pbudget" /></Link>
            <i onClick={() => { toggleMenu(v_burguerMenu) }} className="fas fa-ellipsis-h"></i>
            {/* MOBILE NAVBAR */}
            <nav className='nav-ellipsis-header' ref={v_burguerMenu}>
                <ul className="menu-list-header">
                    {isValid && <li className="nav-item-desktop-header">
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                     </li>}
                    {isValid && <li className="nav-item-desktop-header">
                        <NavLink className="nav-link" to="/users/my-operations">My Operations</NavLink>
                    </li>}
                    {isValid && <li className="nav-item-desktop-header">
                        <NavLink className="nav-link" to="/users/my-categories">My Categories</NavLink>
                    </li>}
                    {!isValid && <li className="nav-item-desktop-header"><NavLink className="nav-link" to="/users/login">Login</NavLink></li> }
                    {!isValid && <li className="nav-item-desktop-header"><NavLink className="nav-link" to="/users/register">Register</NavLink></li>}
                    {isValid && <li className="nav-item-desktop-header"><NavLink className="nav-link" to="/users/password/reset">Reset password</NavLink></li>}
                    {isValid && <li onClick={() => { sessionOut() }} className="nav-item-desktop-header"><NavLink className="nav-link" to="/users/logout">Exit</NavLink></li>}
                </ul>
            </nav>
            {/* TABLET-DESKTOP NAVBAR */}
            <nav className='nav-desktop-header'>
                <ul className="navbar-nav-desktop-header">
                    {isValid && <li className="nav-item-desktop-header">
                        <NavLink className="nav-link-desktop-header" aria-current="page" to="/">Home</NavLink>
                    </li>}
                    {isValid && <li className="nav-item-desktop-header">
                        <NavLink className="nav-link-desktop-header" to="/users/my-operations">My operations</NavLink>
                    </li>}
                    {isValid && <li className="nav-item-desktop-header">
                        <NavLink className="nav-link-desktop-header" to="/users/my-categories">My Categories</NavLink>
                    </li>}
                    {isValid && <li className="nav-item-desktop-header dropdown-desktop-header">
                        <Link onClick={() => toggleMenu(v_dMenu)} className="nav-link-desktop-header dropdown-toggle"
                            to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Options
                        </Link>
                        <ul className="dropdown-menu-desktop-header" aria-labelledby="navbarDropdownMenuLink" ref={v_dMenu}>
                            {!isValid && <li className='dropdown-item-desktop-header'><NavLink className="dropdown-link-desktop-header" to="/users/login">Login</NavLink></li>}
                            {!isValid && <li className='dropdown-item-desktop-header'><NavLink className="dropdown-link-desktop-header" to="/users/register">Register</NavLink></li>}
                            {isValid && <li className='dropdown-item-desktop-header'><NavLink className="dropdown-link-desktop-header" to="/users/password/reset">Reset Password</NavLink></li>}
                            {isValid && <li onClick={() => { 
                                                sessionOut()
                                                setIsValid(false)
                                            }} className='dropdown-item-desktop-header'><NavLink className="dropdown-link-desktop-header" to="/users/logout">Exit</NavLink></li>}
                        </ul>
                    </li>}
                </ul>
            </nav>
        </header>

    )
}

export default Header;