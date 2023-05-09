const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require("cors");

const port = process.env.PORT || 8080;
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const procategoryRouter = require('./routes/prodcategoryRoute');
const blogcategoryRouter = require('./routes/blogCatRoute');
const brandRouter = require('./routes/brancRoute');
const couponRouter = require('./routes/couponRoute');
const colorRouter = require('./routes/colorRoute');
const enqRouter = require('./routes/enqRoute');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user/', authRouter);
app.use('/api/product/', productRouter);
app.use('/api/blog/', blogRouter);
app.use('/api/category/', procategoryRouter);
app.use('/api/blogcategory/', blogcategoryRouter);
app.use('/api/brand/', brandRouter);
app.use('/api/coupon/', couponRouter);
app.use('/api/color/', colorRouter);
app.use('/api/enquiry/', enqRouter);
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