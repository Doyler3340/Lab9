// Importing required modules
const express = require('express'); // Express framework for building the server
const app = express(); // Creating an instance of an Express app
const port = 4000; // Defining the port for the server to listen on

const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
app.use(cors()); // Allow cross-origin requests from any domain

// Middleware to set custom headers for cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allowed headers
  next(); // Proceed to the next middleware or route handler
});

// Importing and configuring body-parser for parsing incoming request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(bodyParser.json()); // Parse JSON data in request bodies

// Importing mongoose for interacting with MongoDB
const mongoose = require('mongoose');

// Connecting to a MongoDB database using a connection string
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Defining a schema for movies in MongoDB
const movieSchema = new mongoose.Schema({
  title: String, // Movie title
  year: String,  // Release year
  poster: String // Poster URL
});

// Creating a model from the schema to interact with the "movies" collection
const movieModel = new mongoose.model('Movie', movieSchema);

// Route: Fetch all movies from the database
app.get('/api/movies', async (req, res) => {
    const movies = await movieModel.find({}); // Retrieve all movies
    res.status(200).json({ movies }); // Send the retrieved movies in JSON format
});

// Route: Fetch a specific movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findById(req.params.id); // Find movie by ID
  res.json(movie); // Send the found movie in JSON format
});

// Route: Update a movie's details by ID
app.put('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findByIdAndUpdate(
    req.params.id, // Movie ID from the request URL
    req.body, // Updated movie data from the request body
    { new: true } // Return the updated document
  );
  res.send(movie); // Send the updated movie data
});

// Route: Delete a movie by its ID
app.delete('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findByIdAndDelete(req.params.id); // Delete movie by ID
  res.status(200).send("Deleted: " + movie); // Send a success response
});

// Route: Add a new movie
app.post('/api/movies', async (req, res) => {
    console.log(req.body.title); // Log the title of the new movie
    const { title, year, poster } = req.body; // Extract movie data from the request body

    const newMovie = new movieModel({ title, year, poster }); // Create a new movie document
    await newMovie.save(); // Save the new movie to the database

    res.status(201).json({ "message": "Movie Added!", Movie: newMovie }); // Send a success response
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log the server's address
});

/* 
Sample movie data structure for reference (to be sent in requests or used for testing):
