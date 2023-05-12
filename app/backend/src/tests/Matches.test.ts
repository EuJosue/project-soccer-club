import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { matches, matchesInProgress, matchesNotInProgress } from './mocks/Matches.mock';
import Match from '../database/models/Match';
import Auth from '../utils/Auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  const auth = new Auth();
  const token = auth.generateToken({ id: 1, email: 'admin@admin.com' });

  describe('GET /matches', () => {
    it('Se quando chamado sem inProgress responde com status 200 e um array com todas as partidas', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matches as unknown as Match[]);

      const { body, status } = await chai
        .request(app).get('/matches');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(matches);
    });

    it('Se quando chamado com inProgress true responde com status 200 e um array com as partidas em progresso', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesInProgress as unknown as Match[]);

      const { body, status } = await chai
        .request(app).get('/matches?inProgress=true');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(matchesInProgress);
    });

    it('Se quando chamado com inProgress false responde com status 200 e um array com as partidas em progresso', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesNotInProgress as unknown as Match[]);

      const { body, status } = await chai
        .request(app).get('/matches?inProgress=false');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(matchesNotInProgress);
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    it('Se não for passado um token responde com status 401 e Token not found', async () => {
      const { body, status } = await chai
        .request(app).patch('/matches/1/finish');

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('Se passado um token inválido responde com status 401 e Token must be a valid token', async () => {
      const { body, status } = await chai
        .request(app).patch('/matches/1/finish')
        .auth('invalid_token', { type: 'bearer' });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se passado um id válido responde com status 200 e a partida atualizada', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);

      const { body, status } = await chai
        .request(app).patch('/matches/1/finish')
        .auth(token, { type: 'bearer' });

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Finished' });
    });

    it.only('Se passado um id inválido responde com status 404 e Match not found', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([0]);

      const { body, status } = await chai
        .request(app).patch('/matches/3/finish')
        .auth(token, { type: 'bearer' });

      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Match not found' });
    });
  });

  afterEach(sinon.restore);
});
