import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderNav from './HeaderNav';

const { logInApi } = require("../ApiPaths")

/*
    This component is used for User Login.
*/

const LogIn = () => {

    const [loginData, setLogInData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const changeHandler = (e) => {
        e.preventDefault();
        setLogInData({ ...loginData, [e.target.name]: e.target.value })
    }

    const onLogin = async () => {
        console.log(loginData);
        if (loginData.email == '' || loginData.password == '') {
            alert("Please enter email and password");
            return;
        }

        logIn(loginData);
    }

    const logIn = async (loginData) => {
        try {
            const response = await fetch(logInApi, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            const result = await response.json();
            if (result.Response.statusCode == 200) {
                console.log(result.Response.Message);
                localStorage.setItem("isLoggedIn", 'true')
                navigate("../home");
                clearForm();
            }
            else {
                localStorage.clear();
            }
            alert(result.Response.Message);

        } catch (error) {
            console.log("Error while Add Book");
            alert("Error while Add Book")
            console.log(error);
            localStorage.clear();
        }
    }

    const clearForm = () => {
        setLogInData({ email: '', password: '' });
    }

    return (
        <>
            <HeaderNav />

            <section className="h-screen">

                <div style={{ textAlign: 'center', margin: '10px', fontSize: '12px' }}>
                    For your ease you can use below credentials for login, OR you can signup as well..
                    <pre>Email:test@moodle.com</pre>
                    <pre>Password:1234</pre>
                </div>

                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form className='login-form' style={{ marginTop: '-250px' }}>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Email address"
                                        onChange={changeHandler}
                                        name='email'
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Password"
                                        onChange={changeHandler}
                                        name='password'
                                    />
                                </div>

                                <div className="text-center lg:text-center">
                                    <button onClick={onLogin}
                                        type="button"
                                        style={{ width: '200px' }}
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default LogIn