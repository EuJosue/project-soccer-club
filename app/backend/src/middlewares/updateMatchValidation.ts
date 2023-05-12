import genericMiddlewareGenerator from '../utils/genericMiddlewareGenerator';
import updateMatchJoi from './joi/updateMatch.joi';

export default genericMiddlewareGenerator(updateMatchJoi);
