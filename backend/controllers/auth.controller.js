const multer = require('multer')
const { BooksList, addBookInStore, updateBookInStore, UsersList, addUserInStore, fileStorageLocation } = require("../data")

//<--------------- User Controllers --------------->

/* Register new user
    Mandatory Inputs - req.body.email && req.body.password
*/
const register = async (req, res) => {
    console.log(req.body);
    if (!req.body.email && !req.body.password) {
        res.status(400).json({
            Response: {
                statusCode: 400,
                Message: "Missing Parameters email or password",
            }
        })
    }
    else {
        const email = req.body.email;

        const found = UsersList.some(el => el.email === email);
        console.log("User found status while Register:- " + found);
        if (found) {
            res.status(200).json({
                Response: {
                    statusCode: 409,
                    Message: "User email already exists.",
                }
            })
        }
        else {
            addUserInStore(req.body);
            res.status(201).json({
                Response: {
                    statusCode: 201,
                    Message: "User created successfully.",
                }
            })
        }
    }
}

/* Authenticate the User
    Mandatory Inputs - req.body.email && req.body.password
*/
const signIn = async (req, res) => {
    if (req.body && req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;

        const found = UsersList.some(el => el.email === email && el.password === password);
        console.log("User Found status while Login:- " + found);
        if (found) {
            res.status(200).json({
                Response: {
                    statusCode: 200,
                    Message: "User LoggedIn Successfully",
                }
            })
        }
        else {
            res.status(400).json({
                Response: {
                    statusCode: 400,
                    Message: "Invalid email or password",
                }
            })
        }
    } else {
        res.status(400).json({
            Response: {
                statusCode: 400,
                Message: "Missing email or password",
            }
        })
    }
}

/* This will return the all exsiting users
    Mandatory Inputs - Not Applicable
*/
const listUsers = (req, res) => {
    res.status(200).json({
        Response: {
            Message: "successful",
            data: UsersList,
        }
    })
}

//<--------------- Books Controllers --------------->

/* This API will used to add new book in the BookList store
*/
const addBook = async (req, res) => {
    try {
        console.log(req.body)
        if (req.body) {
            uploadFile(req, res);
            // addBookInStore(req.body)
            // res.status(201).json({
            //     Response: {
            //         Message: "Book added successfully",
            //     }
            // })
        }
        else {
            res.status(400).json({
                Response: {
                    Message: "Missing bookData",
                }
            })
        }
    } catch (error) {
        console.log("Error in Add API");
        console.log(error);
        res.status(500).json({
            Response: {
                Message: "Internal server error",
            }
        })
    }
}

/* This API will used to update book in the BookList store
    on the basis of bookId
*/
const updateBook = async (req, res) => {
    console.log(req.body)
    if (req.body) {
        let bookId = req.body.bookId;
        uploadFile(req, res);
        // updateBookInStore(bookId, req.body)
        // res.status(200).json({
        //     Response: {
        //         Message: "Book updated successfully",
        //     }
        // })
    }
    else {
        res.status(400).json({
            Response: {
                Message: "Missing bookId or bookData",
            }
        })
    }
}

/* This API is used to list the books from the store.*/
const listBooks = (req, res) => {
    res.status(200).json({
        Response: {
            Message: "successful",
            data: BooksList,
        }
    })
}

/* This API is used to search the book on the basis of book name.*/
const searchBook = (req, res) => {
    console.log("Entered in searchBook API");
    console.log(req.query);

    if (req.query.searchData) {
        let searchedRes = BooksList.filter((book) => {
            return book.bookName === req.query.searchData
        })

        res.status(201).json({
            Response: {
                Message: "Book searched successfully",
                data: searchedRes,
            }
        })
    } else {
        res.status(400).json({
            Response: {
                Message: "Missing book searchable Text",
            }
        })
    }
}

/* This method is used while Add or Update Book with File*/
const uploadFile = (req, res) => {
    let localStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, fileStorageLocation);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    });

    let upload = multer({
        storage: localStorage,
        fileFilter: (req, file, cb) => {
            cb(null, true);
        }
    }).single("coverImage");

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
            console.log("File upload error");
            console.log(err);
            res.status(200).json({
                Response: {
                    statusCode: 409,
                    Message: "Opps,File could not be uploaded",
                }
            })
        }
        else {
            let fileObj = req.file;
            console.log(fileObj);

            req.body["ImageName"] = fileObj.filename;
            req.body["ImagePath"] = fileObj.path;

            if (req.body.mode == 'Add') {
                req.body["CreatedAt"] = new Date().toDateString();
                addBookInStore(req.body);
                res.status(201).json({
                    Response: {
                        Message: "Book added successfully",
                    }
                })
            }
            else {
                let bookId = req.body.bookId;
                req.body["UpdatedAt"] = new Date().toDateString();
                let response = updateBookInStore(bookId, req.body)
                if (response.msg == 'Updated') {
                    res.status(201).json({
                        Response: {
                            Message: response.details,
                        }
                    })
                }
                else {
                    console.log(response);
                    res.status(401).json({
                        Response: {
                            Message: response.details,
                        }
                    })
                }
            }
        }
    })
}

module.exports = { register, signIn, listUsers, addBook, updateBook, listBooks, searchBook };