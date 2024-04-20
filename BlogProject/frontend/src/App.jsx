
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ContactUs from './Pages/ContactUs';
import UserBlogs from './Pages/UserBlogs';
import CreateBlog from './Pages/CreateBlog';
import BlogEdit from './Pages/BlogEdit';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-edit/:id" element={<BlogEdit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>

    </>


  )
}

export default App;
