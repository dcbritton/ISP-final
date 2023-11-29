import React from "react";
import './styles.css';
import Logo from './img/logo.png'
import ProfileIcon from './img/profile.svg'
import { Link, useLocation } from "react-router-dom"
import SearchBar from "./SearchBar";

function NavBar({CurrentUser, DoLogoutStuff, SetSearchFilters}) {
    const location = useLocation()

    return (
        <div className="NavBar">
            <Link to="/"><img className="Logo" src={Logo} alt=""/></Link>
            <div className="SiteTitle"><b>PastExchange</b></div>
            {location.pathname === '/' && <SearchBar SetSearchFilters={SetSearchFilters}/>}
            
            <div class="dropdown">
                <img className="ProfileIcon" src={ProfileIcon} alt=""/>
                {CurrentUser ? 
                <div class="dropdown-options">
                    <Link className='dropdown-option' to='/blogs'>Your Blogs</Link>
                    <Link className='dropdown-option' to='/likes'>Your Likes</Link>
                    <Link className='dropdown-option' onClick={DoLogoutStuff}>Logout</Link>
                </div>
                :
                <div class="dropdown-options">
                    <Link className='dropdown-option' to='/login'>Login</Link>
                </div>
                }
            </div>

            
        </div>
    );
}

export default NavBar;
