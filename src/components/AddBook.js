import React, { useState } from 'react'
import HeaderNav from './HeaderNav';
import NoAuth from './NoAuth';
import { v4 as uuidv4 } from 'uuid';

const { addBookApi, updateBookApi, defaultImagePath } = require("../ApiPaths");

/*
    This component is used to Add or UpdateBook.
*/

const AddBook = ({ bookDetails, mode }) => {

    if (!bookDetails) {
        bookDetails = {
            bookId: '',
            bookName: '',
            authorName: '',
            bookImage: '',
            bookDesc: '',
            coverImage: ''
        }
    }

    if (!mode) {
        mode = 'Add';
    }
    const [openMode, setOpenMode] = useState(mode);
    const [bookData, setBookData] = useState(bookDetails);

    const handleChange = (e) => {
        e.preventDefault();
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    }

    const submitBookData = (e) => {
        e.preventDefault();
        console.log(bookData);
        if (bookData.bookName == '' || bookData.authorName == '' || !bookData.coverImage || bookData.bookDesc == '') {
            alert("Please fill the Form");
        }
        else {
            openMode == 'Add' ? addBook(bookData) : updateBook(bookData);
        }
    }

    const onFileChange = (e) => {
        setBookData({ ...bookData, coverImage: e.target.files[0] })
    }

    const addBook = async (bookData) => {
        try {

            const formData = new FormData();
            formData.append('bookId', uuidv4())
            formData.append('coverImage', bookData.coverImage)
            formData.append('bookName', bookName);
            formData.append('authorName', authorName);
            formData.append('bookDesc', bookDesc);
            formData.append('bookImage', defaultImagePath);
            formData.append('mode', openMode)

            const response = await fetch(addBookApi, {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                },
                body: formData
            })

            const result = await response.json();
            if (result.Response) {
                console.log(result.Response.Message);
                alert(result.Response.Message);
                clearForm();
            }

        } catch (error) {
            console.log("Error while Add Book");
            alert("Error while Add Book")
            console.log(error);
        }
    }

    const updateBook = async (bookData) => {
        try {

            const formData = new FormData();
            formData.append('bookId', bookData.bookId)
            formData.append('coverImage', bookData.coverImage)
            formData.append('bookName', bookName);
            formData.append('authorName', authorName);
            formData.append('bookDesc', bookDesc);
            formData.append('bookImage', defaultImagePath);
            formData.append('mode', openMode)

            console.log(bookData);

            const response = await fetch(updateBookApi, {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                },
                body: formData
            })

            const result = await response.json();
            if (result.Response) {
                console.log(result.Response.Message);
                alert(result.Response.Message);
                clearForm();
            }

        } catch (error) {
            console.log("Error while update Book");
            alert("Error while update Book")
            console.log(error);
        }
    }

    const clearForm = () => {
        bookDetails = {
            bookName: '',
            authorName: '',
            bookImage: '',
            bookDesc: ''
        }
        setBookData(bookDetails);
    }

    if (!localStorage.getItem("isLoggedIn")) {
        return (<NoAuth />)
    }

    let { bookName, authorName, bookImage, bookDesc } = bookData;

    return (
        <>
            <HeaderNav />
            <div className="flex flex-col justify-center min-h-screen overflow-hidden add__book_container">
                <div className='container wrapper'>
                    <div style={{ border: '1px solid grey' }} className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl add__book_box">
                        <h1 className="text-3xl text-center text-black-400 font-bold  uppercase">
                            {(openMode == 'Add') ? 'Add Book' : 'Update Book'}
                        </h1>
                        <div style={{ marginLeft: '50px' }} className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                            <form className="mt-6" onSubmit={submitBookData}>
                                <div className="mb-5 form_row">
                                    <label for="bookname"
                                        className="block text-sm font-semibold text-gray-800">
                                        Book Name
                                    </label>
                                    <input
                                        type="text"
                                        name='bookName'
                                        value={bookName}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 mt-2 text-black-400 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mb-5 form_row">
                                    <label for="authorname"
                                        className="block text-sm font-semibold text-gray-800">
                                        Author Name
                                    </label>
                                    <input
                                        type="text"
                                        name='authorName'
                                        value={authorName}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 mt-2 text-black-400 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mb-5 form_row">

                                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                                        for="file_input">Book Cover Image
                                    </label>
                                    <input
                                        id="file_input"
                                        type="file"
                                        onChange={(e) => onFileChange(e)}
                                        className="block w-full px-4 py-2 mt-2 text-black-400 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40" />

                                </div>

                                <div className="mb-5 form_row">
                                    <label for="description"
                                        className="block text-sm font-semibold text-gray-800">
                                        Book Description
                                    </label>
                                    <input
                                        type="text"
                                        name='bookDesc'
                                        value={bookDesc}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 mt-2 text-black-400 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white add__book_button">
                                        {(openMode == 'Add') ? 'Add Book' : 'Update Book'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBook