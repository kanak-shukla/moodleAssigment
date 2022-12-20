import React, { useState } from 'react'
import BookInfoModal from './BookInfoModal';
import HeaderNav from './HeaderNav';
const { searchBookApi } = require("../ApiPaths");

/*
    This component is used to search the book from the book store Api.
*/

const SearchBook = () => {

  const [searchText, setSearchText] = useState('');
  const [searchRes, setSearchRes] = useState(false);
  const [bookData, setBookData] = useState({})

  const getBookData = async () => {
    try {
      if (!searchText || searchText == '') {
        alert("Please enter book Name");
        return;
      }

      const response = await fetch(searchBookApi + new URLSearchParams({
        searchData: searchText
      }))
      const result = await response.json();
      console.log(result);

      if (result.Response.data.length > 0) {
        setSearchRes(true);
        setBookData(result.Response.data[0])
      }
      else {
        alert("Sorry, No book found with this name. Search with other name.")
        setSearchRes(false);
      }

    } catch (error) {
      console.log("Error while search Book");
      console.log(error);
      setSearchRes(false);
    }
  }

  const hideBookModal = () => {
    setSearchRes(false)
  }

  return (
    <>
      <HeaderNav />
      <div className="container wrapper">
        <div className="flex item-center search__container">
          <input
            type="text"
            name='searchText'
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full px-4 py-2 text-black-700 bg-white border rounded-md search__container--input"
            placeholder="Search Book..."
          />
          <button onClick={() => getBookData()} className="px-4 text-white  rounded search__container--button">Search</button>
          {searchRes ? <BookInfoModal
            curBookElem={bookData}
            onClose={hideBookModal}
          /> : ""}
        </div>
      </div>
    </>
  )
}

export default SearchBook