import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ id, isUser, title, description, image, username, time }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-edit/${id}`)
  }
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`)
      if (data && data.success) {
        alert('Blog deleted');
        // navigate("/my-blogs");
        window.location.reload();
      }
      else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <p>Blog Card</p>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        {/* <img src="" alt="" /> */}
        <p>{username}</p>
        <span>{time}</span>
      </div>
      {
        isUser && (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>

          </>
        )
      }
    </>
  )
}

export default BlogCard;