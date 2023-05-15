import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import {
  leaderboardHome,
  matchsForLeaderboard,
} from './mocks/Leaderboard.mock';
  import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  describe('GET /leaderboard/home', () => {
    it('Se response com status 200 e um array no formato correto', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchsForLeaderboard as unknown as Match[]);

      const { body, status } = await chai
        .request(app).get('/leaderboard/home');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(leaderboardHome);
    });
  });

  afterEach(sinon.restore);
});
