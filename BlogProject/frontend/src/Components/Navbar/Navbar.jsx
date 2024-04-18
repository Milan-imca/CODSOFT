import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Navbar = () => {
  const isLogin = useSelector(state => state.isLogin)
  console.log(isLogin);
  return (
    <>
      <nav>
        <span>Readify</span>

        <ul>
          <Link to={"/"} style={{ textDecoration: 'none' }}><li>Blogs</li></Link>
          {
            isLogin && (<>
              <li>My Blogs</li>
              <li>Create Blog</li>
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
                <Link to="/register"> <button className='signUpBtn'>Sign Up</button></Link>
              </>
            )
          }

          {
            isLogin && (
              <>
                <button className='logoutBtn'> Log Out</button>
              </>
            )
          }

        </div>
      </nav>
    </>
  )
}

export default Navbar;