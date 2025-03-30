import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';

// Simulated Database
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'worker1', password: 'worker123', role: 'worker' },
  { id: 3, username: 'guest1', password: 'guest123', role: 'guest' }
];

const vehicles = [];
const guests = [];

// JWT Secret Key
const SECRET_KEY = 'your_secret_key';

// Initialize Express
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(bodyParser.json());

// 🚀 LOGIN - Issue JWT
app.post('/user/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT with user ID
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ access_token: token });
});

// 🔒 Middleware - Authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        console.log("NO HEADER");
      return res.status(403).json({ error: 'Access denied' });
    }
  
    const token = authHeader;
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = users.find(u => u.id === decoded.id);
      if (!req.user) return res.status(404).json({ error: 'User not found' });
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };

// 📌 GET Current User Info
app.get('/user/me', authenticateJWT, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username, role: req.user.role });
});

// 🔐 Middleware - Role-based Access Control
const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Forbidden: Insufficient rights' });
  }
  next();
};

// 🏎 Vehicle Routes (Only for Workers)
app.get('/vehicles', authenticateJWT, authorize('worker'), (req, res) => {
  res.json(vehicles);
});

app.post('/vehicles', authenticateJWT, authorize('worker'), (req, res) => {
  const { plateNumber, model } = req.body;
  const newVehicle = { id: vehicles.length + 1, plateNumber, model, owner: req.user.id };
  vehicles.push(newVehicle);
  res.status(201).json(newVehicle);
});

// 👥 Guest Routes (Only for Workers)
app.get('/guests', authenticateJWT, authorize('worker'), (req, res) => {
  res.json(guests);
});

app.post('/guests', authenticateJWT, authorize('worker'), (req, res) => {
  const { name, visitReason } = req.body;
  const newGuest = { id: guests.length + 1, name, visitReason, registeredBy: req.user.id };
  guests.push(newGuest);
  res.status(201).json(newGuest);
});

// ⚙️ Admin Routes
app.get('/admin/users', authenticateJWT, authorize('admin'), (req, res) => {
  res.json(users);
});

// 🚀 Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
