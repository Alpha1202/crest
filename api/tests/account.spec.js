import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
    const account = {
        id: 4,
        accountNumber: 123456,
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
});  
//     describe('User sign Up', () => {
//         it('should not be able to POST a new user sign up', (done) => {
//             chai.request(app)
//             .post('/api/v1/users/auth/signup')
//             .send(user2)
//             .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.be.a('object');
//             res.body.error.should.equal('Email already exists');
//             done();
//             });
//         });
//     });

//     describe('User sign Up', () => {
//         it('should not be able to POST a new user sign up', (done) => {
//             chai.request(app)
//             .post('/api/v1/users/auth/signup')
//             .send(user3)
//             .end((err, res) => {
//             res.should.have.status(422);
//             res.body.should.be.a('object');
//             res.body.error.should.equal('Please enter a valid email');
//             done();
//             });
//         });
//     });

//     describe('User sign Up', () => {
//         it('should not be able to POST a new user sign up', (done) => {
//             chai.request(app)
//             .post('/api/v1/users/auth/signup')
//             .send(user4)
//             .end((err, res) => {
//             res.should.have.status(422);
//             res.body.should.be.a('object');
//             res.body.error.should.equal('Must be at least 3 characters long');
//             done();
//             });
//         });
//     });

//     describe('User sign Up', () => {
//         it('should not be able to POST a new user sign up', (done) => {
//             chai.request(app)
//             .post('/api/v1/users/auth/signup')
//             .send(user5)
//             .end((err, res) => {
//             res.should.have.status(422);
//             res.body.should.be.a('object');
//             res.body.error.should.equal('Must be at least 3 characters long');
//             done();
//             });
//         });
//     });
//     describe('User sign Up', () => {
//         it('should not be able to POST a new user sign up', (done) => {
//             chai.request(app)
//             .post('/api/v1/users/auth/signup')
//             .send(user6)
//             .end((err, res) => {
//             res.should.have.status(422);
//             res.body.should.be.a('object');
//             res.body.error.should.equal('Password should be atleast six characters');
//             done();
//             });
//         });
//     });

//     describe('User sign In', () => {
//         it('should POST a new user sign in', (done) => {
//             chai.request(app)
//             .post('/api/v1/users/auth/signin')
//             .send(user)
//             .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             done();
//             });
//         });
//     });

//     describe('User sign In', () => {
//         it('should not be able to POST a new user sign in', (done) => {
//             chai.request(app)
//             .post('/api/v1/users/auth/signin')
//             .send(user7)
//             .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.be.a('object');
//             res.body.error.should.equal('Email does not exist');
//             done();
//             });
//         });
//     });
// });
