import express from "express"
import { Server } from "socket.io";

const app = express()
 const port  = process.env.PORT || 3500
app.use(express.static("public"))
const expressServer = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const io = new Server(expressServer, {
  cors: {
    origin:process.env.NODE_ENV === "production"
        ? false
        : [
            "http://localhost:5500",
            "http://127.0.0.1:5500",
          ],
  },
});
io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)
    socket.on("message", (data) => {
        console.log(data);
        io.emit(`message` ,`mkb  ${socket.id.substring(0,5)}: ${data}`)
  });
});

