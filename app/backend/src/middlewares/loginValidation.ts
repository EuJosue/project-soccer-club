import genericMiddlewareGenerator from '../utils/genericMiddlewareGenerator';
import loginJoi from './joi/login.joi';

export default genericMiddlewareGenerator(loginJoi);
