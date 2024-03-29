import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import authRouter from './routes/auth.js';
import { ErrorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/animals/auth', authRouter);
app.use((req, res, next) => {
  try {
    res.status(404).send("Sorry can't find that!");
  } catch (err) {
    next(err);
  }
});

app.use(ErrorHandler);

app.set('port', process.env.PORT || 3013);

const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
