import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/LoginController';
import validateToken from '../middlewares/validateToken';

const router = Router();
const loginController = new LoginController();

router.post('/', loginValidation, (req, res) => loginController.login(req, res));

router.get('/role', validateToken, (req, res) => loginController.findRole(req, res));

export default router;
