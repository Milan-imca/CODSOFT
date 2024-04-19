const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//get single Blog
exports.getSingleBlog = async (req, res) => {

  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this id",
      });

    }
    return res.status(200).send({
      success: true,
      message: "Success in fetching a single blog",
      blog,
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while fetching single blog",
      error
    })
  }
}

//all blogs (GET)
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogModel.find({}).populate("user");
    if (!allBlogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs were found!",
      })
    }

    return res.status(200).send({
      blogCount: allBlogs.length,
      success: true,
      message: 'All Blogs',
      allBlogs,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error while fetching the blogs',
      error,
    })
  }
}

//create a blog (POST)
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields something is missing',
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.send(404).send({
        success: false,
        message: 'User not found'
      })
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res.status(201).send({
      success: true,
      message: "Blog Created Successfully",
      newBlog,
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating the blog",
      error,
    })
  }
}

//update a blog (PUT)
exports.blogUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
    return res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    })

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: "false",
      message: "Error while updating the blog",
      error,
    })
  }
}

//delete a blog (DELETE)
exports.deleteBlog = async (req, res) => {

  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted Successfully!",
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting blog",
      error
    })
  }
}


exports.getUserBlog = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(200).send({
        success: false,
        message: 'Blogs not found with this Id!'
      })
    }
    return res.status(200).send({
      success: true,
      message: "User Blogs",
      userBlogCount: userBlog.blogs.length,
      userBlog,
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user blog",
    })
  }
}
