// Import Statements to import required modules
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3300;

const apiRoutes = require("./routes");
const connectDatabase = require("./config/database");

//Connect Database Connection
connectDatabase();

// Application using JSON
app.use(express.json());

// basic endpoint to check if server is running
app.get("/", (req, res) => {
	res.send(`Hey,I am Green Bowl's Backend Server Here`);
});

// Application using Cors
app.use(cors());

// Application importing routes from routes folder
app.use("/api", apiRoutes);

// Application initializing server at PORT
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
