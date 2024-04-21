const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectMongo = require('./config/MonogDB');
const path = require('path');

//env config: keep this first 
dotenv.config();

//importing the Routes:
//User
const userRoutes = require('./routes/userRoutes');

//Blogs
const blogRoutes = require('./routes/blogRoutes');

//MongoDb connection
connectMongo();

//object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
//user:
app.use("/api/v1/user", userRoutes);
//blogs
app.use("/api/v1/blog", blogRoutes);


app.use(express.static(path.join(__dirname, './frontend/dist')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"))
})
//Getting from .env file
const PORT = process.env.PORT || 8080;


//listening
app.listen(PORT, () => {
  console.log(`Server is running succesfully!`);
});