# Getting Started BookKeeping Store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts for Frontend

In the project directory, you can run:

`Steps:-` 1. Run `npm install` in root folder.
          2. go to backend folder.
          3. Run `npm install`.
          4. then In root folder Run `npm start`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `Implemented functionalities in this project:- `

1.User Authentication Signup/Login
2.Add or Update Book with book Image
3.View Books
4.Search Book (search book only by the exact book name)

Protected Routes - Add Book, Update Book, View Book

## Available Scripts To start the Backend

`Steps:-` 1. Go to backend folder.
          2. Run `npm start` to start the server.
          3. You will see `server is listening at port 5000` if server started successfully.

### `Note for static data storage`:- 
1. Uploaded files are stored in the "uploadedFiles" folder in the backend root directory.
2. Since I am not using any database, So I have created one static file `data.js` in the backend root directory to manage the data.
3. Once server is started you can perform Any user or book related operations like Register New User, Add New Book, Update the Book, and it will reflect in the UI,
4. But once you stopped the server, you will be shown the default data whatever stored in the data.js file.
