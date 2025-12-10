const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle signup form submissions
app.post('/signup', (req, res) => {
  const { name, password } = req.body;

  // Create a new user instance
  const newUser = new User({ name, password });

  // Save the user to the database
  newUser.save((err, savedUser) => {
    if (err) {
      console.error('Error saving user to database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User saved to database:', savedUser);
      res.send('Signup successful!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
