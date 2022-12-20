import React, { useEffect } from 'react'
import Containers from './Containers';
import HeaderNav from './HeaderNav';
import NoAuth from './NoAuth';

/*
    This component is used to show AddBook, View Books or Search Book card views.
*/

const Home = () => {

    if (!localStorage.getItem("isLoggedIn")) {
        return (<NoAuth />)
    }

    return (
        <div>
            <HeaderNav />
            <div className='container mx-auto grid__outer flex items-center justify-center'>
                <Containers cardTitle={'Add Book'} navigatePath="add" />
                <Containers cardTitle={'View Books'} navigatePath="list" />
                <Containers cardTitle={'Search Book'} navigatePath="search" />
            </div>
        </div>
    )
}

export default Home