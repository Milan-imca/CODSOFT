import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/user/login",
        {
          email: input.email,
          password: input.password,
        });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success('User login successfully')
        navigate("/");
      }
      else {
        toast.error("Something went wrong!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-xs">
          <h2 className="text-center text-2xl font-bold text-orange-500 mb-4">Sign In</h2>
          <p className="text-center text-gray-600 mb-4">Welcome back</p>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
                value={input.email}
                onChange={handleInput}
                name='email'
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="**********"
                value={input.password}
                onChange={handleInput}
                name='password'
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className='mt-4 text-center'>
              <p>Create a new account? <span className='text-orange-500 cursor-pointer' onClick={() => navigate("/register")}>Sign Up</span></p>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default Login;