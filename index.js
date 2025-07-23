require("dotenv").config();  // Load .env into process.env     
const express    = require("express");
const cors       = require("cors");

const contactRoutes = require("./routes/contactForm");

const app = express();

//  Enable cors because my front and back are not in the same host 
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173", "https://mohamed-khalil-mehalli-etu.pedaweb.univ-amu.fr/extranet/Site%20perso/htmlfr/index.html"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Parse incoming JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mount your contact route
app.use("/send", contactRoutes);

// Start server 
const PORT =  3000;
app.listen(PORT, () => {console.log("Start server")});