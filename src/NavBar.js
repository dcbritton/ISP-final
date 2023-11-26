import React from "react";
import './styles.css';
import Logo from './img/logo.png'
import ProfileIcon from './img/profile.svg'
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar";

function NavBar({CurrentUser}) {
    let navigate = useNavigate()
    function handleProfileClick() {
        navigate('/login')
    }

    return (
        <div className="NavBar">
            <img className="Logo" src={Logo} alt=""/>
            <div className="SiteTitle">Oxymoronomicon</div>
            <SearchBar/>
            <div className="ProfileIcon" onClick={handleProfileClick}><img src={ProfileIcon} alt=""/></div>

        </div>
    );
}

export default NavBar;
