require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require('./routes/index');
const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Database connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the database!"))
  .catch((error) => console.error(error));

app.use(router);
app.all('*',(req,res)=>{
    res.status(404).json('404 Not Found');
});

if(process.env.NODE_ENV == 'production')
{
    app.use(express.static(__dirname+'/dist/'));
    app.get('*',(req,res)=>{
        res.sendFile(__dirname+'/dist/index.html');
    });
}
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})