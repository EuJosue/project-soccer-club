import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';

import { users } from './mocks/Login.mock';
import User from '../../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('login', () => {
  describe('POST /login', async () => {
    it('Se não for passado uma senha responde com status 400 e All fields must be filled', async () => {
      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send(JSON.stringify(
          { email: 'admin@admin.com' }
        ));

      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Se não for passado um email responde com status 400 e All fields must be filled', async () => {
      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send(JSON.stringify(
          { password: 'secret_admin' }
        ));

      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
    
    it('Se passado um email inválido responde com status 401 e Unauthorized', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send(JSON.stringify(
          { email: 'adminwrongemail@admin.com', password: 'secret_admin' }
        ));

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('Se passado uma senha inválida responde com status 401 e Unauthorized', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(users[0] as unknown as User);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send(JSON.stringify(
          { email: 'admin@admin.com', password: 'wrong_secret_admin' }
        ));

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('Se passado um email e senha válidos responde com status 200 e um token', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(users[0] as unknown as User);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send(JSON.stringify(
          { email: 'admin@admin.com', password: 'secret_admin' }
        ));

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.have.property('token');
    });
  });

  afterEach(sinon.restore);
});
