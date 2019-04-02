import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
    const user = {
        email: "nzube@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123456",
    };
    const user2 = {
        email: "nzubennamani@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123456",
    };
    const user3 = {
        email: "nzubennamani@gmail .com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123456",
    };
    const user4 = {
        email: "nnamani@gmail.com",
        firstName: "Nz",
        lastName: "Nnamani",
        password: "123456",
    };
    const user5 = {
        email: "nnamani@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nn",
        password: "123456",
    };
    const user6 = {
        email: "nnamani@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123",
    };




    describe('User sign Up', () => {
        it('should POST a new user sign up', (done) => {
            chai.request(app)
            .post('/api/v1/users/auth/signup')
            .send(user)
            .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
            });
        });
    });
    
    describe('User sign Up', () => {
        it('should not be able to POST a new user sign up', (done) => {
            chai.request(app)
            .post('/api/v1/users/auth/signup')
            .send(user2)
            .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.equal('Email already exists');
            done();
            });
        });
    });

    describe('User sign Up', () => {
        it('should not be able to POST a new user sign up', (done) => {
            chai.request(app)
            .post('/api/v1/users/auth/signup')
            .send(user3)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('Please enter a valid email');
            done();
            });
        });
    });

    describe('User sign Up', () => {
        it('should not be able to POST a new user sign up', (done) => {
            chai.request(app)
            .post('/api/v1/users/auth/signup')
            .send(user4)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('Must be at least 3 characters long');
            done();
            });
        });
    });

    describe('User sign Up', () => {
        it('should not be able to POST a new user sign up', (done) => {
            chai.request(app)
            .post('/api/v1/users/auth/signup')
            .send(user5)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('Must be at least 3 characters long');
            done();
            });
        });
    });
    describe('User sign Up', () => {
        it('should not be able to POST a new user sign up', (done) => {
            chai.request(app)
            .post('/api/v1/users/auth/signup')
            .send(user6)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('please enter your password');
            done();
            });
        });
    });
});