const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const port = process.env.PORT || 8080;
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user/', authRouter);
app.use('/api/product/', productRouter);
// app.use("/", (req, res) => {
//   res.send("hello world 1111111111111")
// })
app.use(notFound);
app.use(errorHandler);

(async () => {
  try {
    //using mongoose
    await connection();


    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
  } catch (error) {
    console.log(">>>>> Error: " + error)
  }
})()

// https://github.com/techinfo-youtube?tab=repositories