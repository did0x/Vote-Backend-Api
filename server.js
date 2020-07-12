import express from 'express';
import cors from 'cors';
import usersRoute from './app/routers/usersRoute';
import seedUserRoute from './app/routers/seedUserRoute';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', seedUserRoute);

const port = process.env.PORT || 3002;
app.listen(port).on('listening', () => {
    console.log(`🚀 are live on ${port}`);
});

export default app;