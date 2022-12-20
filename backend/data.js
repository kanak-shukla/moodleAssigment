//<--------------- User related data + methods--------------->

const UsersList = [
    {
        name: "test",
        email: "test@moodle.com",
        password: "1234",
    },
    {
        name: "test1",
        email: "test1@moodle.com",
        password: "1234",
    },
    {
        name: "test2",
        email: "test2@moodle.com",
        password: "1234",
    },
    {
        name: "tes3",
        email: "test3@moodle.com",
        password: "1234",
    }
]

const addUserInStore = (userObj) => {
    UsersList.push(userObj);
}

//<--------------- Books related data + methods --------------->

const BooksList = [
    {
        bookId: 1,
        bookName: "Economics",
        bookImage: "https://via.placeholder.com/200/200",
        authorName: "Kanak",
        bookDesc: "Perfect Book",
        ImageName: '',
        ImagePath: '',
    },
    {
        bookId: 2,
        bookName: "Artificial Intelligence",
        authorName: "Kanak Shukla",
        bookImage: "https://via.placeholder.com/200/200",
        bookDesc: "Awesome Book",
        ImageName: '',
        ImagePath: '',
    },
    {
        bookId: 3,
        bookName: "Social Science",
        authorName: "Kanak Shukla",
        bookImage: "https://via.placeholder.com/200/200",
        bookDesc: "General Book",
        ImageName: '',
        ImagePath: '',
    },
    {
        bookId: 4,
        bookName: "Maths",
        authorName: "Kanak Shukla",
        bookImage: "https://via.placeholder.com/200/200",
        bookDesc: "Perfect Book",
        ImageName: '',
        ImagePath: '',
    }
]

const addBookInStore = (bookObj) => {
    BooksList.push(bookObj);
}

const updateBookInStore = (bookId, bookData) => {
    console.log("Enterd in updateBookInStore with bookId:- " + bookId);

    let bookIndex = BooksList.findIndex((book => book.bookId == bookId));
    console.log("bookIndex :- " + bookIndex);

    if (bookIndex !== -1) {
        BooksList[bookIndex].authorName = bookData.authorName;
        BooksList[bookIndex].bookDesc = bookData.bookDesc;
        BooksList[bookIndex].bookImage = bookData.bookImage;
        BooksList[bookIndex].bookName = bookData.bookName;
        BooksList[bookIndex].ImageName = bookData.ImageName;
        BooksList[bookIndex].ImagePath = bookData.ImagePath
        BooksList[bookIndex]["UpdatedAt"] = bookData.UpdatedAt;

        return { msg: "Updated", details: 'Book Updated Successfully.' };
    }
    else {
        console.log("No book found with this bookId");
        return { msg: "Not Updated", details: 'No book found with this bookId' };
    }
}

const fileStorageLocation = "../backend/uploadedFiles";

module.exports = { UsersList, addUserInStore, BooksList, addBookInStore, updateBookInStore, fileStorageLocation };