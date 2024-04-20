
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../redux/store';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = useSelector(state => state.isLogin) || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success('Logged Out Successfully!');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='flex items-center justify-between py-4 px-6 shadow-md bg-gradient-to-r w-full overflow-x-hidden'>
      <span className="text-orange-500 text-2xl font-bold">Readify</span>


      <ul className="hidden md:flex justify-center space-x-4 text-white hover:text-gray-200">
        <li><Link to="/" className="text-gray-600  hover:text-orange-500">Blogs</Link></li>
        {isLogin && (
          <>
            <li><Link to="/my-blogs" className=" text-gray-600 hover:text-orange-500">My Blogs</Link></li>
            <li><Link to="/create-blog" className="text-gray-600  hover:text-orange-500">Create Blog</Link></li>
          </>
        )}
        <li><Link to="/contact-us" className="text-gray-600  hover:text-orange-500">Contact Us</Link></li>
      </ul>
      <div className="flex items-center">
        <div className="flex items-center mr-4 space-x-4">
          {!isLogin && (
            <>
              <Link to="/login" className="bg-orange text-orange-600 px-4 py-2 rounded-full hover:bg-ornage-700 hover:bg-orange-100">Log In</Link>
              <Link to="/register" className="bg-orange text-orange-600 px-4 py-2 rounded-full hover:bg-ornage-700 hover:bg-orange-100">Sign Up</Link>
            </>
          )}
          {isLogin && (
            <button className="bg-white text-orange-600 px-4 py-2 rounded-full hover:bg-orange-100" onClick={handleLogout}>
              Log Out
            </button>
          )}
          <div className="md:hidden">
            <button onClick={toggleDropdown}>
              {isDropdownOpen ? (
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              )}
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-16 left-0 right-0 bg-white shadow-md p-2 rounded-md">
                <li><Link to="/" className="text-gray-600 hover:text-ornage-500" onClick={toggleDropdown}>Blogs</Link></li>
                {isLogin && (
                  <>
                    <li><Link to="/my-blogs" className="text-orange-600 hover:text-orange-700" onClick={toggleDropdown}>My Blogs</Link></li>
                    <li><Link to="/create-blog" className="text-orange-600 hover:text-orange-700" onClick={toggleDropdown}>Create Blog</Link></li>
                  </>
                )}
                <li><Link to="/contact-us" className="text-orange-600 hover:text-orange-700" onClick={toggleDropdown}>Contact Us</Link></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// export default Navbar;
