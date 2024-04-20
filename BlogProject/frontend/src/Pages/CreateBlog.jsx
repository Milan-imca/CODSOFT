
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    user: localStorage.getItem('userId') || '' // This should be the logged-in user's ID
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/blog/create-blog", formData);
      if (response.data.success) {
        toast.success('Blog created successfully');
        navigate('/my-blogs');
        e.target.reset(); // Reset form fields
      } else {
        toast.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog');
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label htmlFor="title">Title:</label>
    //   <input
    //     type="text"
    //     id="title"
    //     name="title"
    //     value={formData.title}
    //     onChange={handleChange}
    //     required
    //   />
    //   <br />

    //   <label htmlFor="description">Description:</label>
    //   <textarea
    //     id="description"
    //     name="description"
    //     value={formData.description}
    //     onChange={handleChange}
    //     required
    //   />
    //   <br />

    //   <label htmlFor="image">Image URL:</label>
    //   <input
    //     type="text"
    //     id="image"
    //     name="image"
    //     value={formData.image}
    //     onChange={handleChange}
    //     required
    //   />
    //   <br />

    //   {/* Assuming user ID is stored in localStorage */}
    //   <input
    //     type="hidden"
    //     name="user"
    //     value={localStorage.getItem('userId')}
    //     onChange={handleChange}
    //   />

    //   <button>Create Blog</button>
    // </form>

    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
      <h2 className="text-center text-2xl font-bold text-orange-500 mb-4">Create Blog</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />

          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />

          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />

          <input
            type="hidden"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
