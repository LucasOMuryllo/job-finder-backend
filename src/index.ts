import 'reflect-metadata';
import { AppDataSource } from './config/ormconfig';
import app from './app';
import config from './config/env';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
