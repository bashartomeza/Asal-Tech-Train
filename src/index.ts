import express from 'express';
import path from 'path';
import userRouter from './route/userRouter';
import authRouter from './route/authRouter';
import mongoose from 'mongoose';  

mongoose.connect('mongodb://localhost:27017/frt', {});

const app = express();
const PORT = 3000;


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});