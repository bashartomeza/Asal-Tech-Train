import express from 'express';
import path from 'path';
import userRouter from './route/userRouter';
import authRouter from './route/authRouter';

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ⬇️ Important: Parse form data (required for login/register)
app.use(express.urlencoded({ extended: true })); // <-- FIX
app.use(express.json()); // Keep this for JSON APIs

// Routes
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});