import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../redux/store';

const Navbar = () => {
  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(isLogin);

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert('Logged Out Successfully!');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <nav>
        <span>Readify</span>
        <ul className='links'>
          <Link to={"/"} style={{ textDecoration: 'none' }}><li>Blogs</li></Link>
          {
            isLogin && (
              <>
                <Link to={"/my-blogs"} style={{ textDecoration: 'none' }}><li>My Blogs</li></Link>
                <Link to={"/create-blog"} style={{ textDecoration: 'none' }}><li>Create Blog</li></Link>
              </>

            )
          }

          <Link to={"/contact-us"} style={{ textDecoration: 'none' }}><li>Contact Us</li></Link>
        </ul>

        <div className='navButtons'>
          {
            !isLogin && (
              <>
                <Link to="/login"><button className='loginBtn'>Log In</button></Link>
                <Link to="/register"><button className='signUpBtn'>Sign Up</button></Link>
              </>
            )
          }

          {
            isLogin && (
              <>
                <button className='logoutBtn' onClick={handleLogout}> Log Out</button>
              </>
            )
          }

        </div>
      </nav>
      <div className='mobileLinks'>
        <ul>
          <Link to={"/"} style={{ textDecoration: 'none' }}><li className='link-blogs'>Blogs</li></Link>
          <li className='link-contact-us'>Contact Us</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar;