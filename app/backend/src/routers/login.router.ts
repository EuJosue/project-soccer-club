import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/LoginController';

const router = Router();
const loginController = new LoginController();

router.post('/', loginValidation, (req, res) => loginController.login(req, res));

router.get('/role', (req, res) => loginController.findRole(req, res));

export default router;
