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

let users;
//
io.on("connection", async (socket) => {
  users++;
  console.log("Nouvelle connexion :", socket.id);

  // Send the last 20 texts history 
  const history = await loadLast(20);
  socket.emit("previousMessages", history);

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);   // diffuse à tous
    append(msg); // Save the message in the buffer
    console.log(msg)
  });

  socket.on("disconnect", () => {
    console.log("Déconnexion :", socket.id);
    users--;
  });
});


// Start server 
const PORT =  process.env.PORT || 3000;
server.listen(PORT, () => {console.log("Start server on port", PORT)});