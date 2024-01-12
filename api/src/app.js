const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/config');
const cors = require('cors'); 
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); 
app.use(bodyParser.json());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});