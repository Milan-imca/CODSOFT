const express = require('express');
const { getAllBlogs, createBlog, blogUpdate, deleteBlog, getSingleBlog, getUserBlog } = require('../controller/blogController');


const router = express.Router();

//get All blogs route:
router.get('/all-blogs',getAllBlogs);

//create a blog route:
router.post('/create-blog',createBlog);

//update a blog route:
router.put('/update-blog/:id',blogUpdate);

//delete a blog route:
router.delete('/delete-blog/:id',deleteBlog);

//router for getting single blog:
router.get('/get-blog/:id',getSingleBlog);

//user blogs route
router.get('/user-blog/:id',getUserBlog);


module.exports = router;