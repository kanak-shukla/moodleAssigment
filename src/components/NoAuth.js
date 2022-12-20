import React from 'react'
import { NavLink } from 'react-router-dom';

/*
    This component is used when user tries to navigate on the Authenticated Routes.
    Authenticated Routes - Home, AddBook, ViewBooks, SearchBook
    No-Auth Routes - Login, Register
*/

const NoAuth = () => {
    return (
        <div className='no-auth'>
            <h3 style={{ margin: '50px', textAlign: 'center' }}>Authentication Error , Please Login..</h3>
            <NavLink className={'no-auth-link'} to={"../login"}> Login</NavLink>
        </div>
    )
}

export default NoAuth