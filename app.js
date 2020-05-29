require('dotenv').config();
const path = require('path')
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// allow cross-origin requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(result => {
    console.log('listening at port 8000')
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  })
  .catch(err => console.log(err))
mongoose.connection.once('open', () => {
  console.log('Connedted to mongoose db')
}).catch((err) => {
  throw new Error('Error with db', err)
})