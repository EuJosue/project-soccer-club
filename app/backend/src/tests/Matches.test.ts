import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import {
  justMatch,
  matches,
  matchesInProgress,
  matchesNotInProgress,
} from './mocks/Matches.mock';
import Match from '../database/models/Match';
import Auth from '../utils/Auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  const auth = new Auth();
  const token = auth.generateToken({ id: 1, email: 'admin@admin.com' });

  describe('GET /matches', () => {
    it('Se chamado sem inProgress responde com status 200 e um array com todas as partidas', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matches as unknown as Match[]);

      const { body, status } = await chai
        .request(app).get('/matches');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(matches);
    });

    it('Se chamado com inProgress igual a true responde com status 200 e um array com as partidas em progresso', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesInProgress as unknown as Match[]);

      const { body, status } = await chai
        .request(app).get('/matches?inProgress=true');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(matchesInProgress);
    });

    it('Se chamado com inProgress igual a false responde com status 200 e um array com as partidas em progresso', async () => {
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

    it('Se passado um id inválido responde com status 404 e Match not found', async () => {
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

  describe('PATCH /matches/:id', () => {
    it('Se não for passado um token responde com status 401 e Token not found', async () => {
      const { body, status } = await chai
        .request(app).patch('/matches/1');

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('Se passado um token inválido responde com status 401 e Token must be a valid token', async () => {
      const { body, status } = await chai
        .request(app).patch('/matches/1')
        .auth('invalid_token', { type: 'bearer' });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se passado um id válido responde com status 200 e Updated', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);

      const { body, status } = await chai
        .request(app).patch('/matches/1')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Updated' });
    });

    it('Se passado um id inválido responde com status 404 e Match not found', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([0]);

      const { body, status } = await chai
        .request(app).patch('/matches/3')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });

      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Match not found' });
    });

    it('Se passado um id válido e um body inválido responde com status 400 e Bad request', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);

      const { body, status } = await chai
        .request(app).patch('/matches/1')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamGoals: 3
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Bad request' });
    });

    it('Se passado um id válido e um body válido com gols negativos responde com status 422 e Goals must be at least 0', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);

      const { body, status } = await chai
        .request(app).patch('/matches/1')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamGoals: -1,
          awayTeamGoals: -1
        });

      expect(status).to.be.equal(422);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Goals must be at least 0' });
    });
  });

  describe('POST /matches', () => {
    it('Se não for passado um token responde com status 401 e Token not found', async () => {
      const { body, status } = await chai
        .request(app).post('/matches');

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('Se passado um token inválido responde com status 401 e Token must be a valid token', async () => {
      const { body, status } = await chai
        .request(app).post('/matches')
        .auth('invalid_token', { type: 'bearer' });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se passado um body inválido responde com status 400 e Bad request', async () => {
      const { body, status } = await chai
        .request(app).post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Bad request' });
    });

    it('Se passado um body válido com gols negativos responde com status 422 e Goals must be at least 0', async () => {
      const { body, status } = await chai
        .request(app).post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: -1,
          awayTeamGoals: -1
        });

      expect(status).to.be.equal(422);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Goals must be at least 0' });
    });

    it('Se passado um body válido com times iguais responde com status 422 e It is not possible to create a match with two equal teams', async () => {
      const { body, status } = await chai
        .request(app).post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamId: 1,
          awayTeamId: 1,
          homeTeamGoals: 1,
          awayTeamGoals: 1
        });
      console.log(body);

      expect(status).to.be.equal(422);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('Se passado um body válido com times que não existem responde com status 404 e There is no team with such id!', async () => {
      sinon
        .stub(Match, 'findOrCreate')
        .resolves(undefined);

      const { body, status } = await chai
        .request(app).post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamId: 3,
          awayTeamId: 4,
          homeTeamGoals: 1,
          awayTeamGoals: 1
        });

      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });

    it('Se passado um body válido responde com status 201 e os dados da partida', async () => {
      sinon
        .stub(Match, 'findOrCreate')
        .resolves([justMatch as unknown as Match, true]);

      const { body, status } = await chai
        .request(app).post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 1,
          awayTeamGoals: 1
        });

      expect(status).to.be.equal(201);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({
        id: 1,
        inProgress: true,
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 1
      });
    });
  });

  afterEach(sinon.restore);
});