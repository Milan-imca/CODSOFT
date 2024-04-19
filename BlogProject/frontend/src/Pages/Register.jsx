import React from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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
        alert('User registered successfully')
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='mainContainer'>

      {/* form part */}
      <div className='formContainer'>
        <div className='formTitle'>
          <h1>Sign Up</h1>
          <span>Begin your journey with Readify</span>
          {/* <p>Welcome back</p> */}
        </div>
        <div className='form'>
          <form action="" onSubmit={handleSubmit}>
            <label>Name*</label><br />
            {/* <input type="text" placeholder='Name' name='username' value={input.name} onChange={handleInput} /><br /> */}
            <input type="text" placeholder='Name' name='username' value={input.username} onChange={handleInput} /><br />
            <label>Email*</label><br />
            <input type="email" placeholder='Email' name='email' value={input.email} onChange={handleInput} /><br />
            <label>Password*</label><br />
            <input type="text" placeholder='Password' name='password' value={input.password} onChange={handleInput} /><br />
            <button>Sign Un</button>
          </form>
        </div>
        <div className='text'>
          <p>Don't have an account ? <span onClick={() => navigate("/login")}>Sign Up</span></p>
        </div>
      </div>
      {/* image container */}
      <div className='imageContainer'>
        <img src="login_img.png" alt="" />
      </div>
    </div>
  )
}

export default Register;