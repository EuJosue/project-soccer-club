import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/Team';
import { teams } from './mocks/TeamModel.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Integração', () => {
  describe('teams', () => {
    describe('GET /teams', () => {
      beforeEach(() => {
        sinon
          .stub(Team, "findAll")
          .resolves(teams as unknown as Team[]);
      });

      it('Se responde com status 200 e um array de times', async () => {
        const { body, status } = await chai
          .request(app).get('/teams');

        expect(status).to.be.equal(200);
        expect(body).to.be.an('array');
        expect(body).to.be.deep.equal(teams);
      });
    });

    describe('GET /teams/:id', async () => {
      it('Se responde com status 200 e um time', async () => {
        const { body, status } = await chai
          .request(app).get('/teams/1');

        expect(status).to.be.equal(200);
        expect(body).to.be.an('object');
        expect(body).to.be.deep.equal(teams[0]);
      })
    });
  });
  
  afterEach(sinon.restore)
});
