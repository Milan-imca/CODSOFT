import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../Components/Blogs/BlogCard';

const Blog = () => {

  const [blog, setBlog] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/blog/all-blogs");
      if (data && data.success) {
        setBlog(data.allBlogs);
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getAllBlogs();

  }, [])

  console.log(blog);
  return (
    <div>

      Blogs Page
      {
        blog && blog.map((item) => {
          return (
            <BlogCard
              id={item._id}
              isUser={localStorage.getItem("userId") === item.user._id}
              key={item._id}
              title={item.title}
              description={item.description}
              // image={item.image}
              username={item.user.username}
              time={item.createdAt}
            />

          )
        }
        )
      }
      {/* <BlogCard /> */}

    </div>
  )
}

export default Blog;