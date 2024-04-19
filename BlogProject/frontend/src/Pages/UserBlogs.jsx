import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../Components/Blogs/BlogCard';

const UserBlogs = () => {
  const [userBlog, setUserBlog] = useState(null);

  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${id}`);

      if (data && data.success) {
        setUserBlog(data.userBlog); // Update to set userBlog directly
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserBlog();
  }, [])

  console.log(userBlog);

  return (
    <>
      <p>User blogs</p>
      {
        userBlog && userBlog.blogs.length > 0 ?
          userBlog.blogs.map((blog) => {
            return (
              <BlogCard
                id={blog._id}
                isUser = {true}
                key={blog._id}
                title={blog.title}
                description={blog.description}
                // image={blog.image}
                username={userBlog.username} // Access username from userBlog
                time={blog.createdAt}
              />
            )
          })
          : <p>No Blogs are created by you</p>
      }
    </>
  )
}

export default UserBlogs;
