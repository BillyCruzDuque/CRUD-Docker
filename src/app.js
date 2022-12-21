import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use('/api', employeesRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use((req, res, next) => {
    res.status(404).json({msg: 'Not found'});
});

export default app;