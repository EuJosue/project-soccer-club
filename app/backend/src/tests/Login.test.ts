import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { users } from './mocks/Login.mock';
import User from '../database/models/User';
import Auth from '../utils/Auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('login', () => {
  describe('POST /login', async () => {
    it('Se não for passado uma senha responde com status 400 e All fields must be filled', async () => {
      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com'
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Se não for passado um email responde com status 400 e All fields must be filled', async () => {
      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'secret_admin'
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Se passado um email inválido responde com status 401 e Invalid email or password', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'adminwrongemail@admin.com',
          password: 'secret_admin'
        });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('Se passado uma senha inválida responde com status 401 e Invalid email or password', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(users[0] as unknown as User);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'wrong_secret_admin'
        });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('Se passado um email com formato inválido responde com status 401 e Invalid email or password', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(users[0] as unknown as User);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'adminwrongemail',
          password: 'wrong_secret_admin'
        });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('Se passado uma senha de tamanho inválido responde com status 401 e Invalid email or password', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(users[0] as unknown as User);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'wrong'
        });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('Se passado um email e senha válidos responde com status 200 e um token', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(users[0] as unknown as User);

      const { body, status } = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        });

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.have.property('token');
    });
  });

  describe('GET /login/role', () => {
    it('Se não for passado um token responde com status 401 e Token not found', async () => {
      const { body, status } = await chai
        .request(app)
        .get('/login/role');

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('Se passado um token inválido responde com status 401 e Token must be a valid token', async () => {
      const { body, status } = await chai
        .request(app)
        .get('/login/role')
        .auth('wrong_token', { type: 'bearer' });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se passado um token válido responde com status 200 e o role do usuário', async () => {
      const token = new Auth().generateToken({ id: 1, email: 'admin@admin.com' });

      const { body, status } = await chai
        .request(app)
        .get('/login/role')
        .auth(token, { type: 'bearer' });

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ role: 'admin' });
    });
  });

  afterEach(sinon.restore);
});
