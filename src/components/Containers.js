import React from 'react'
import { NavLink } from 'react-router-dom';

/*
    This file is used to show the card views on Home Page
    mainly - AddBook, ViewBooks, SearchBook
*/

const Containers = (props) => {
    const { cardTitle, navigatePath } = props;
    return (
        <button className="grid__item text-center">
            <NavLink className="text-xl text-gray-600 font-semibold  flex items-center justify-center" to={`../${navigatePath}`} end> {cardTitle}</NavLink>
        </button>
    )
}

export default Containers