import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/', (req, res) => leaderboardController.findAll(req, res));
router.get('/away', (req, res) => leaderboardController.findAllAway(req, res));
router.get('/home', (req, res) => leaderboardController.findAllHome(req, res));

export default router;
