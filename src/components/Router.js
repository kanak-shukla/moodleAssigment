import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home';
import HeaderNav from './HeaderNav';
import AddBook from './AddBook';
import ViewBooks from './ViewBooks';
import SearchBook from './SearchBook';
import LogIn from './LogIn';
import Register from './Register';

/*
    This component is used to define the Routers
*/

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HeaderNav />} />
                <Route path='login' element={<LogIn />} />
                <Route path='register' element={<Register />} />
                <Route path='home' element={<Home />} />
                <Route path='add' element={<AddBook />} />
                <Route path='list' element={<ViewBooks />} />
                <Route path='search' element={<SearchBook />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router