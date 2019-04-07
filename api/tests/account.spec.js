import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
    const account = {
        id: 4,
        accountNumber: '123456',
        ownerId: 3,
        type: "savings",
        status: "active",
        openingBalance: 123456
    }
    
    describe('create new account', () => {
        it('should not POST a new account because there is no token', (done) => {
            chai.request(app)
            .post('/api/v1/accounts')
            .send(account)
            .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            done();
            });
        });
    });
 

    describe('activate or deactivate an account', () => {
        it('should not be able to activate or deactivate an account because there is no token', (done) => {
            chai.request(app)
            .patch('/api/v1/accounts/12345')
            .send()
            .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            done();
            });
        });
    });
});
