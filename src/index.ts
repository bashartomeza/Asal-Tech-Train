const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, '../src/data/users.json');

app.use(express.json());

// Helper to read data
const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // If file doesn't exist, return empty array
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading data:', err);
    return [];
  }
};

// Helper to write data
const writeData = (data: any) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data:', err);
  }
};

app.get('/users', (req:any, res:any) => {
  const users = readData();
  res.json(users);
});

app.get('/users/:id', (req:any, res:any) => {
  const users = readData();
  const user = users.find((u:any) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', (req:any, res:any) => {
  const users = readData();
  const newUser = req.body;
  users.push(newUser);
  writeData(users);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req:any, res:any) => {
  const users = readData();
  const id =parseInt(req.params.id);
  const updatedUser = req.body;
  const userIndex = users.findIndex((u:any) => u.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    writeData(users);
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
 
});

app.delete('/users/:id',(req:any,res:any) => {
const users = readData();
const id =parseInt(req.params.id);
const userIndex = users.findIndex((u:any) => u.id === id);
if (userIndex !== -1) {
  users.splice(userIndex, 1);
  writeData(users);
  res.sendStatus(204);
} else {
  res.status(404).send('User not found');
}
});

app.post('/users/login', (req:any, res:any) => {
  const users = readData();
  const { email, password } = req.body;
  const user = users.find((u:any) => u.email === email && u.password === password);
  
  if (user) {
        const { password, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/users/search/:query', (req:any, res:any) => {
  const users = readData();
  const query = req.params.query;
  const filteredUsers = users.filter((u:any) => u.name.toLowerCase().includes(query.toLowerCase()));
  res.json(filteredUsers);
});

//
// Start the server
//
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});