import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.findAllHome(req, res));

export default router;
