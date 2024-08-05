const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectToMongoDB = require("./db/connectMongoDb");

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require('./routes/message.routes')
const usersRoutes = require('./routes/user.routes')


const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);




app.listen(PORT, () => {
  connectToMongoDB()
  console.log("Server is Running " + PORT);
});
