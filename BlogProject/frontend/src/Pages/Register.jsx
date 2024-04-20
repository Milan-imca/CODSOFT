import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const Register = () => {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
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
      const { data } = await axios.post("http://localhost:8080/api/v1/user/register",
        {
          username: input.username,
          email: input.email,
          password: input.password,
        });
      if (data.success) {
        toast.success('User registered successfully')
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // <div className='mainContainer'>


    //   <div className='formContainer'>
    //     <div className='formTitle'>
    //       <h1>Sign Up</h1>
    //       <span>Begin your journey with Readify</span>

    //     </div>
    //     <div className='form'>
    //       <form action="" onSubmit={handleSubmit}>
    //         <label>Name*</label><br />

    //         <input type="text" placeholder='Name' name='username' value={input.username} onChange={handleInput} /><br />
    //         <label>Email*</label><br />
    //         <input type="email" placeholder='Email' name='email' value={input.email} onChange={handleInput} /><br />
    //         <label>Password*</label><br />
    //         <input type="text" placeholder='Password' name='password' value={input.password} onChange={handleInput} /><br />
    //         <button>Sign Un</button>
    //       </form>
    //     </div>
    //     <div className='text'>
    //       <p>Don't have an account ? <span onClick={() => navigate("/login")}>Sign Up</span></p>
    //     </div>
    //   </div>

    //   <div className='imageContainer'>
    //     <img src="login_img.png" alt="" />
    //   </div>
    // </div>
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-center text-2xl font-bold text-orange-500 mb-4">Create an Account</h2>
        <p className="text-center text-gray-600 mb-4">Start your journey</p>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name='username'
              value={input.username}
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
              name='email'
              value={input.email}
              onChange={handleInput}
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
              name='password'
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className='mt-4 text-center'>
            <p>Have an account? <span className='text-orange-500 cursor-pointer' onClick={() => navigate("/login")}>Sign In</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;