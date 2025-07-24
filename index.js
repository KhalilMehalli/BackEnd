require("dotenv").config();  // Load .env into process.env     
const express    = require("express");
const cors       = require("cors");

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

// Start server 
const PORT =  3000;
app.listen(PORT, () => {console.log("Start server")});