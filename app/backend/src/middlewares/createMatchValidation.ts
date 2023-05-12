import genericMiddlewareGenerator from '../utils/genericMiddlewareGenerator';
import createMatchJoi from './joi/createMatch.joi';

export default genericMiddlewareGenerator(createMatchJoi);
