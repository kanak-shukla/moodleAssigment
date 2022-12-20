import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/*
    This file shows the Header Navigation
*/

const HeaderNav = () => {

    const [logInText, setLoginText] = useState('Login');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) {
            setLoginText("Logout")
        }
    }, [logInText])

    const handleClick = () => {
        if (logInText === 'Login') {
            navigate('../login');
        }
        else if (logInText === 'Logout') {
            alert("You have been logged in successfully.");
            localStorage.clear();
            setLoginText("Login")
            navigate('../login');
        }
    }

    return (
        <div className='container wrapper sticky'>
            <nav style={{ height: '70px', backgroundColor: 'aliceblue', display: 'flex' }} className="navbar fixed-top sticky" aria-label="Site navigation">
                <a href="https://moodle.rtctek.com/" className="navbar-brand d-none d-md-flex align-items-center m-0 mr-4 p-0 aabtn">
                    <img
                        src="https://moodle.rtctek.com/pluginfile.php/1/core_admin/logocompact/300x300/1670219114/RTC_NewLogo.jpeg"
                        className="logo mr-1"
                        style={{ height: '70px' }}
                        alt="RTC" />
                </a>

                <div className='header-nav-link'>
                    <NavLink style={{ margin: '20px' }} to={"../Home"}>Home</NavLink>
                    <NavLink style={{ margin: '20px' }} to={"../add"}>Add Book</NavLink>
                    <NavLink style={{ margin: '20px' }} to={"../list"}>List Books</NavLink>
                </div>

                <NavLink style={{ marginRight: '100px' }} to={"../register"} className='header-nav-link-logout'>Register</NavLink>
                <button style={{ marginRight: '20px' }} onClick={handleClick} className='header-nav-link-logout'>{logInText}</button>
            </nav>
        </div>
    )
}

export default HeaderNav