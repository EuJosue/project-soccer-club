import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchController from '../controllers/MatchController';

const router = Router();
const matchController = new MatchController();

router.get('/', (req, res) => matchController.findAllWithTeamName(req, res));

router.patch('/:id/finish', validateToken, (req, res) => matchController.finishMatch(req, res));

export default router;
