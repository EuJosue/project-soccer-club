import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();
const matchController = new MatchController();

router.get('/', (req, res) => matchController.findAllWithTeamName(req, res));

export default router;
