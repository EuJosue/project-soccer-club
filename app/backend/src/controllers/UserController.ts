// import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class TeamController {
  constructor(private userService = new UserService()) {}
}
