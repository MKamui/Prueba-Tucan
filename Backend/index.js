const express = require('express');
const app = express();
const cors = require('cors')

const users = [
  { email: 'prueba1@gmail.com'},
  { email: 'prueba2@gmail.com'},
];

app.use(cors())
app.use(express.json());

app.post('/login', (req, res) => {
    const { email } = req.body;
    const user = users.find((user) => user.email === email);
    if (user) {
      res.status(200).json({ message: `${email} found` });
    } else {
        res.json({ message: `${email} not found` });
    }
  });

app.listen(3001, () => {
  console.log('Server started on port 3001');
});