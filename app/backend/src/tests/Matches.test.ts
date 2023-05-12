import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { matches } from './mocks/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  describe('GET /matches', () => {
    it('Se responde com status 200 e um array de partidas', async () => {
      const { body, status } = await chai
        .request(app).get('/matches');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(matches);
    });
  });

  afterEach(sinon.restore);
});
