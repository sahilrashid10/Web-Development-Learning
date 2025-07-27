import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors());  // ✅ Fix is here

// Middleware
app.use(bodyParser.json()); // parses JSON
app.use(bodyParser.urlencoded({ extended: true })); // parses form data

app.get('/', (req, res) => {
  res.send("Server running"); // just to test GET route
});

app.post('/', (req, res) => {
  console.log(req.body);  // ✅ should log your React form data
  res.send('Data Received'); // ✅ must send something to resolve fetch
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
