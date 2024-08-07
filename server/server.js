const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {app} = require('./socket/socket')

const connectToMongoDB = require("./db/connectMongoDb");

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require('./routes/message.routes')
const usersRoutes = require('./routes/user.routes');
const { server } = require("./socket/socket");

const corsOptions = {
  origin: 'http://localhost:3000', // The origin you want to allow
  credentials: true, // Allow credentials (cookies)
};


const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);




server.listen(PORT, () => {
  connectToMongoDB()
  console.log("Server is Running " + PORT);
});
