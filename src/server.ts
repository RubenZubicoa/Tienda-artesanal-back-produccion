import express, { type Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import manufacturerRoutes from './routes/manufacturer.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import loginRoutes from './routes/login.routes';
import meetingPointRoutes from './routes/meetingPoint.routes';

const server: Application = express();

// Middlewares

server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
server.use('/api/manufacturers', manufacturerRoutes);
server.use('/api/products', productRoutes);
server.use('/api/orders', orderRoutes);
server.use('/api/users', userRoutes);
server.use('/api/categories', categoryRoutes);
server.use('/api/login', loginRoutes);
server.use('/api/meeting-points', meetingPointRoutes);

export default server;