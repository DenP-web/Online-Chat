const path = require('path')
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {app, server} = require('./socket/socket')

const dirname = path.resolve()

const connectToMongoDB = require("./db/connectMongoDb");

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require('./routes/message.routes')
const usersRoutes = require('./routes/user.routes');

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


app.use(express.static(path.join(dirname, '/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'))
})


server.listen(PORT, () => {
  connectToMongoDB()
  console.log("Server is Running " + PORT);
});
