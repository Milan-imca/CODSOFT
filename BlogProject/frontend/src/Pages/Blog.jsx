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

  return (
    <>

      {/* <div className='overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

        {
          blog && blog.map((item) => {
            return (
              <div>
                <BlogCard
                  id={item._id}
                  isUser={localStorage.getItem("userId") === item.user._id}
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  username={item.user.username}
                  time={item.createdAt}
                />
              </div>
            )
          }
          )
        }
      </div> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-hidden">
        {blog &&
          blog.map((item) => (
            <div key={item._id}>
              <BlogCard
                id={item._id}
                isUser={localStorage.getItem("userId") === item.user._id}
                title={item.title}
                description={item.description}
                image={item.image}
                username={item.user.username}
                time={item.createdAt}
              />
            </div>
          ))}
      </div> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-hidden">
        {blog &&
          blog.map((item) => (
            <div key={item._id} className="flex flex-col">
              <BlogCard
                id={item._id}
                isUser={localStorage.getItem("userId") === item.user._id}
                title={item.title}
                description={item.description}
                image={item.image}
                username={item.user.username}
                time={item.createdAt}
              />
            </div>
          ))}
      </div> */}



      {/* <section class="pt-20 pb-10 lg:pt-[120px] lg:pb-20 bg-white dark:bg-dark overflow-x-hidden">
        <div class="container mx-auto">
          <div class="flex flex-wrap justify-center -mx-4">
            <div class="w-full px-4">
              <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span class="block mb-2 text-lg font-semibold text-primary">
                  Our Blogs
                </span>
                <h2
                  class="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] dark:text-white"
                >
                  Our Recent News
                </h2>
                <p class="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
          {blog &&
            blog.map((item) => (
              <div key={item._id} className="flex flex-col">
                <BlogCard
                  id={item._id}
                  isUser={localStorage.getItem("userId") === item.user._id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  username={item.user.username}
                  time={item.createdAt}
                />
              </div>
            ))}
        </div>
      </section> */}

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Explore the world, one page at a time. Welcome to <span className='text-orange-500'>Readify.</span></h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Embark on a literary journey with Readify. Explore captivating realms, meet unforgettable characters, and ignite your imagination. Welcome to Readify, where every blog is a new adventure.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blog &&
              blog.map((item) => (
                <div key={item._id} className="flex flex-col">
                  <BlogCard
                    id={item._id}
                    isUser={localStorage.getItem("userId") === item.user._id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    username={item.user.username}
                    time={item.createdAt}
                  />
                </div>
              ))}

          </div>
        </div>
      </div>
    </>

  )
}

export default Blog;