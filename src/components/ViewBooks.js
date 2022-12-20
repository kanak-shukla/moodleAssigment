import React, { useState, useEffect } from 'react'
import AddBook from './AddBook';
import BookInfoModal from './BookInfoModal';
import HeaderNav from './HeaderNav';
import NoAuth from './NoAuth';

const { getBooksApi, serverRootPath, uploadFolderPath } = require("../ApiPaths");

/*
    This component is used to show the list view of books.
*/

const ViewBooks = () => {

    const [books, setBooks] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [showEditBook, setEditBook] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [currentBook, setCurrentBook] = useState({})

    useEffect(() => {
        getBooksData();
    }, [])

    const getBooksData = async () => {
        try {
            const response = await fetch(getBooksApi);
            const result = await response.json();
            console.log(result);
            setBooks(result.Response.data)
            setLoading(false);
        } catch (error) {
            console.log("Error while get Books");
            console.log(error);
        }
    }

    const editBook = (data) => {
        console.log(data);
        setEditBook(true);
        setCurrentBook(data)
    }

    const openBookModal = (data) => {
        setCurrentBook(data)
        setShowBookModal(true)
    }

    const hideBookModal = () => {
        setShowBookModal(false)
    }

    if (isLoading) {
        return (
            <>
                <h3>Loading..</h3>
            </>
        )
    }

    if (!localStorage.getItem("isLoggedIn")) {
        return (<NoAuth />)
    }

    return (
        <>
            < section className="book_page " >
                <div className="container wrapper">
                    {showBookModal ?
                        <BookInfoModal
                            curBookElem={currentBook}
                            onClose={hideBookModal}
                        /> :
                        showEditBook ? <AddBook bookDetails={currentBook} mode="Edit" /> :
                            <>
                                <HeaderNav />
                                <div className="book_page__grid flex item-center justify-center flex-wrap">

                                    {books ? books.map((curBookElem) => {
                                        const { bookId, bookName, bookImage, bookDesc, ImageName } = curBookElem;

                                        let coverImage = ImageName ? serverRootPath + uploadFolderPath + "/" + ImageName : bookImage;

                                        return (
                                            <div className="book_page__grid--item" key={bookId}>
                                                <div className="w-full rounded-lg shadow-md lg:max-w-sm">
                                                    <img
                                                        className="object-cover w-full h-48 book_page__image"
                                                        src={coverImage}
                                                        alt="image"
                                                    />
                                                    <div className="p-4">
                                                        <h4 className="text-2xl font-bold text-black-600 mb-2">
                                                            {bookName}
                                                        </h4>
                                                        <p className="mb-5 leading-normal">
                                                            {bookDesc}
                                                        </p>
                                                        <button
                                                            onClick={() => editBook(curBookElem)}
                                                            className="book_page__button text-white font-semibold tracking-wider uppercase text-sm px-6 py-3 rounded shadow mr-4 outline-none focus:outline-none"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="book_page__button text-white font-semibold tracking-wider uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none"
                                                            type="button"
                                                            onClick={() => openBookModal(curBookElem)}>
                                                            Quick View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                        : ""}
                                </div>
                            </>
                    }
                </div>
            </section >
        </>
    )
}

export default ViewBooks