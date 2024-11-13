import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRoute from './routes/userRoute.js';
import mediaRoute from './routes/mediaRoute.js';
import personRoute from './routes/personRoute.js';
import reviewRoute from './routes/reviewRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 9000;
connectDB();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);

// api endpoints
app.use('/api/user', userRoute);
app.use('/api/person', personRoute);
app.use('/api/:mediaType', mediaRoute);
app.use('/api/reviews', reviewRoute);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log('Server started on PORT: ' + port);
});
