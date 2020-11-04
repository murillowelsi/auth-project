import {Router} from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import checkCredentials from './middlewares/checkCredentials';

const routes = new Router();

routes.post('/auth', AuthController.store);

routes.use(checkCredentials);

routes.get('/users', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;