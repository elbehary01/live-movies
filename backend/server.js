import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './src/config/mongodb.js';
import routes from './src/routes/index.js';

// App Config
const app = express();
const port = process.env.PORT || 9000;
connectDB();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// api endpoints
app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send('API Working');
});
app.listen(port, () => {
  console.log('Server started on PORT: ' + port);
});
