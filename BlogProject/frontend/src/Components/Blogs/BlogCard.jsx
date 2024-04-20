import axios from 'axios';
import React from 'react';
import "./BlogCard.css";

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const BlogCard = ({ id, isUser, title, description, image, username, time }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-edit/${id}`)
  }
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`)
      if (data && data.success) {
        navigate("/my-blogs");
        toast.success('Blog deleted');
        window.location.reload();
      }
      else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.log(error);
    }
  }


  //to get the proper date!
  const date = new Date(time);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);




  return (
    <>
      <article className="flex max-w-xl flex-col items-start justify-between">
        <img src={image} alt="Image description" className="w-full h-48 object-cover rounded-t-lg" />

        <div className="flex items-center gap-x-4 text-xs">
          <time className="text-gray-500">{formattedDate}</time>
        </div>


        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              {title}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
        </div>
        {
          isUser && (
            <div className="relative mt-8 flex items-center gap-x-4">
              <button onClick={handleEdit} className="edit-button text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2">Edit</button>
              <button onClick={handleDelete} className="delete-button text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">Delete</button>
            </div>
          )
        }
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-gray-50" />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                {username}
              </a>
            </p>
          </div>
        </div>
      </article>

    </>
  )
}

export default BlogCard;