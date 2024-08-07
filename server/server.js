const path = require('path')
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {app, server} = require('./socket/socket')

const connectToMongoDB = require('./db/connectMongoDB');

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require('./routes/message.routes')
const usersRoutes = require('./routes/user.routes');

const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


server.listen(PORT, () => {
  connectToMongoDB()
  console.log("Server is Running " + PORT);
});
