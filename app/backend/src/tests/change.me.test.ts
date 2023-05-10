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
  describe('Model', () => {
    describe('TeamModel', () => {
      describe('TeamModel.findAll', () => {
        beforeEach(() => {
          sinon
            .stub(Team, "findAll")
            .resolves(teams as unknown as Team[]);
        });

        it('Se retorna um array com todos os times', async () => {
          const { body, status } = await chai
            .request(app).get('/teams');

          expect(status).to.be.equal(200);
          expect(body).to.be.an('array');
          expect(body).to.be.deep.equal(teams);
        });
      });
    });
  });
  afterEach(sinon.restore)
});
