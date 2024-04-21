import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BlogEdit = () => {

  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const id = useParams().id;

  const [formData, setFormData] = useState({
    user: localStorage.getItem('userId') || '' // This should be the logged-in user's ID
  });

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
      const response = await axios.put(`http://localhost:8080/api/v1/blog/update-blog/${id}`, formData);
      if (response.data.success) {
        toast.success('Blog updated successfully');
        navigate("/my-blogs")
        e.target.reset(); // Reset form fields
      } else {
        toast.error('Failed to update blog');
      }
    } catch (error) {
      toast.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    }
  };

  const getBlog = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/blog/get-blog/${id}`);
      if (data && data.success) {
        setBlog(data.blog);
        setFormData({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        })
      }
      else {
        console.log("Blog did'nt fetch!");
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlog();
  }, [id])

  console.log(blog);


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-orange-500 mb-4">Edit Blog</h2>
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
            vvalue={localStorage.getItem('userId')}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default BlogEdit;