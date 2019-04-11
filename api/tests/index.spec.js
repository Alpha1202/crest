/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

describe('Server', () => {
  describe('App', () => {
    it('should run when started', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.equal('Welcome to crest finance APIs');
          done();
        });
    });
  });
});
