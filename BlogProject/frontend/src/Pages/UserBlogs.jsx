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

  return (
    <>
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Blogs</h2>
          </div>
          <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {
              userBlog && userBlog.blogs.length > 0 ?
                userBlog.blogs.map((blog) => {
                  return (
                    <BlogCard
                      id={blog._id}
                      isUser={true}
                      key={blog._id}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      username={userBlog.username} // Access username from userBlog
                      time={blog.createdAt}
                    />
                  )
                })
                : <p>No Blogs are created by you</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBlogs;
