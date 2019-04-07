import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
    const amount = {
        amount: 5000
    }
    
    describe('credit an account', () => {
        it('should not credit the account because there is no token', (done) => {
            chai.request(app)
            .post('/api/v1/transactions/12345/credit')
            .send(amount)
            .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            done();
            });
        });
    });

    describe('debit an account', () => {
        it('should not debit the account because there is no token', (done) => {
            chai.request(app)
            .post('/api/v1/transactions/12345/debit')
            .send(amount)
            .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            done();
            });
        });
    });
 

   
});
