import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/LoginController';

const router = Router();
const loginController = new LoginController();

router.post('/', loginValidation, (req, res) => loginController.login(req, res));

export default router;
