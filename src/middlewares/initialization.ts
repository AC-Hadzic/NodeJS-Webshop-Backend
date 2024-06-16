import { Request, Response, NextFunction } from 'express';
import appDataSource from '../../api/app-data-source';

const initializationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!appDataSource.isInitialized) {
    try {
      await appDataSource.initialize();
      console.log('Data Source has been initialized!');
    } catch (err) {
      console.error('Error during Data Source initialization:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  next();
};

export default initializationMiddleware;
