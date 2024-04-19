import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
        alert('Blog updated successfully');
        navigate("/my-blogs")
        e.target.reset(); // Reset form fields
      } else {
        alert('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <br />

        {/* Assuming user ID is stored in localStorage */}
        <input
          type="hidden"
          name="user"
          value={localStorage.getItem('userId')}
          onChange={handleChange}
        />

        <button>Update </button>
      </form>
    </>
  )
}

export default BlogEdit;