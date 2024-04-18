
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ContactUs from './Pages/ContactUs';

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </>


  )
}

export default App
