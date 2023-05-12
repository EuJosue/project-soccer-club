import { Router } from 'express';
import updateMatchValidation from '../middlewares/updateMatchValidation';
import validateToken from '../middlewares/validateToken';
import MatchController from '../controllers/MatchController';
import createMatchValidation from '../middlewares/createMatchValidation';

const router = Router();
const matchController = new MatchController();

router.get('/', (req, res) => matchController.findAllWithTeamName(req, res));

router.patch('/:id/finish', validateToken, (req, res) => matchController.finishMatch(req, res));

router.patch(
  '/:id',
  validateToken,
  updateMatchValidation,
  (req, res) => matchController.update(req, res),
);

router.post(
  '/',
  validateToken,
  createMatchValidation,
  (req, res) => matchController.create(req, res),
);

export default router;
