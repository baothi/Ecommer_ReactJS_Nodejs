require('dotenv').config();
const mongoose = require('mongoose');
// get the client
// const mysql = require('mysql2/promise');

var dbState = [{
  value: 0,
  label: "Disconnected"
},
{
  value: 1,
  label: "Connected"
},
{
  value: 2,
  label: "Connecting"
},
{
  value: 3,
  label: "Disconnecting"
}];


const dbConnect = async () => {
  try {
    const options = {
      user: 'root',
      pass: process.env.PASSWORD,
      dbName: process.env.DB_NAME,
    }
    console.log(options)
    await mongoose.connect(process.env.MONGO_DB_HOST, options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, "to database");
  } catch (error) {
    console.log(">>> Error: " + error)
  }
}


module.exports = dbConnect;
