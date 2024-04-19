import React from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

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
        localStorage.setItem("userId",data?.user._id);
        dispatch(authActions.login());
        alert('User registered successfully')
        navigate("/");
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
          <h1>Sign In</h1>
          <span>Welcome Back</span>
        </div>
        <div className='form'>
          <form action="" onSubmit={handleSubmit}>

            <label>Email*</label><br />
            <input type="email" placeholder='Email' name='email' value={input.email} onChange={handleInput} /><br />
            <label>Password*</label><br />
            <input type="text" placeholder='Password' name='password' value={input.password} onChange={handleInput} /><br />
            <button>Sign In</button>
          </form>
        </div>

        <div className='text'>
          <p>Don't have an account ? <span onClick={() => navigate("/register")}>Sign Up</span></p>
        </div>


      </div>

      {/* image container */}
      <div className='imageContainer'>
        <img src="login_img.png" alt="" />
      </div>
    </div>
  )
}

export default Login;