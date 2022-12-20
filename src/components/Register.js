import React, { useState } from 'react'
import { registerApi } from '../ApiPaths';
import HeaderNav from './HeaderNav'
import { useNavigate } from 'react-router-dom';

/*
    This component is used to register the user info.
*/

const Register = () => {

    let userDetails = {
        name: '',
        email: '',
        password: '',
    }

    const navigate = useNavigate();

    const [userData, setUserData] = useState(userDetails);

    const handleChange = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const submitUserData = (e) => {
        e.preventDefault();
        console.log(userData);
        if (userData.email == '' || userData.password == '') {
            alert("Please fill the Form");
        }
        else {
            addUser(userData);
        }
    }

    const addUser = async (userData) => {
        try {
            const response = await fetch(registerApi, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const result = await response.json();
            if (result.Response.statusCode == 201) {
                console.log(result.Response.Message);
                clearForm();
                navigate("../login");
            }
            alert(result.Response.Message);

        } catch (error) {
            console.log("Error while create User");
            alert("Error while create User")
            console.log(error);
        }
    }

    const clearForm = () => {
        userDetails = {
            name: '',
            email: '',
            password: '',
        }
        setUserData(userDetails);
    }

    return (
        <>
            <HeaderNav />
            <div className="flex flex-col justify-center min-h-screen overflow-hidden add__book_container">
                <div className='container wrapper'>
                    <div style={{ border: '1px solid grey', marginTop: '-100px' }} className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl add__book_box">
                        <div style={{ textAlign: "center" }}>
                            <h3 className="text-xl font-bold text-gray-600 lg:justify-between justify-center items-center">
                                Register Now
                            </h3>
                        </div><br />
                        <hr />
                        <div style={{ marginLeft: '40px' }} className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                            <form className="mt-6" onSubmit={submitUserData}>

                                <div className="mt-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 undefined">
                                        Name
                                    </label>
                                    <div className="flex flex-col items-start">
                                        <input
                                            type="name"
                                            name="name"
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 mt-2 text-black-400 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 undefined">
                                        Email
                                    </label>
                                    <div className="flex flex-col items-start">
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 mt-2 text-black-400 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 undefined">
                                        Password
                                    </label>
                                    <div className="flex flex-col items-start">
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 mt-2 text-black-400 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center mt-4">
                                    <button
                                        type="submit"
                                        style={{ width: '200px' }}
                                        className="px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false">
                                        Register
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

export default Register