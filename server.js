import express from 'express';
import cors from 'cors';
import usersRoute from './app/routers/usersRoute';
import candidateRoute from './app/routers/candidateRoute';
import blockRoute from './app/routers/blockRoute'
import seedRoute from './app/routers/seedRoute';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', candidateRoute);
app.use('/api', blockRoute);
app.use('/api', seedRoute);

const port = process.env.PORT || 3002;
app.listen(port).on('listening', () => {
    console.log(`🚀 are live on ${port}`);
});

export default app;
