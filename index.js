require("dotenv").config();  // Load .env into process.env     
const express    = require("express");
const http    = require("http");
const cors       = require("cors");
const { Server } = require("socket.io");
const { loadLast, append } = require("./config/gistDb");

const contactRoutes = require("./routes/contactForm");

const app = express();

//  Enable cors because my front and back are not in the same host 
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:4173", 
    "https://mohamed-khalil-mehalli-etu.pedaweb.univ-amu.fr"
],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Parse incoming JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// contact route
app.use("/send", contactRoutes);

// ping route to wake up the back end a the opening of the front end (render free tier)
app.get('/', (_req, res) => {
  res.status(200).send('pong');
  console.log("ping received ")
});

//

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://mohamed-khalil-mehalli-etu.pedaweb.univ-amu.fr"
    ],
    methods: ["GET", "POST"]
  }
});

// Socket 
let users=0;

io.on("connection", async (socket) => {
  users++;

  io.emit("usersCount", users); // broadcast the new count of people
  console.log("Users:", users,"ID socket:", socket.id);

  // Send the last 20 texts history ( from memory )
  const history = await loadLast(20);
  socket.emit("previousMessages", history);

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);   // broacast all user except the sender
    append(msg); // Save the message in the buffer
    console.log(msg)
  });



  socket.on("disconnect", () => {
    users--;
    io.emit("usersCount", users);
    console.log("Users:", users, "ID socket left:", socket.id);
  });
});


// Start server 
const PORT =  process.env.PORT || 3000;
server.listen(PORT, () => {console.log("Start server on port", PORT)});