
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        alert('Blog created successfully');
        navigate('/my-blogs');
        e.target.reset(); // Reset form fields
      } else {
        alert('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog');
    }
  };

  return (
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

      <button>Create Blog</button>
    </form>
  );
};

export default CreateBlogForm;
