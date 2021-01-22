import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from './helpers/AppError';
import './database';
import routes from './routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);

app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
            return response
                .status(error.statusCode)
                .json({ status: 'error', message: error.message });
        }

        console.error(error);

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    },
);

app.listen(3333, () => {
    console.log('Server started');
});
