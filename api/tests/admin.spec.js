import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
    const admin = {
        email: "nzube@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123456",
    };
    const admin2 = {
        email: "nzubennamani@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123456",
    };
    const admin3 = {
        email: "nzubennamani@gmail .com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123456",
    };
    const admin4 = {
        email: "nnamani@gmail.com",
        firstName: "Nz",
        lastName: "Nnamani",
        password: "123456",
    };
    const admin5 = {
        email: "nnamani@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nn",
        password: "123456",
    };
    const admin6 = {
        email: "nnamani@gmail.com",
        firstName: "Nzubechukwu",
        lastName: "Nnamani",
        password: "123",
    };
    
    const admin7 = {
        
        password: "123456"
    }
    


    describe('Admin sign Up', () => {
        it('should POST a new admin sign up', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signup')
            .send(admin)
            .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
            });
        });
    });
    
    describe('Admin sign Up', () => {
        it('should not be able to POST a new admin sign up', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signup')
            .send(admin2)
            .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.equal('Email already exists');
            done();
            });
        });
    });

    describe('Admin sign Up', () => {
        it('should not be able to POST a new admin sign up', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signup')
            .send(admin3)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('Please enter a valid email');
            done();
            });
        });
    });

    describe('Admin sign Up', () => {
        it('should not be able to POST a new admin sign up', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signup')
            .send(admin4)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('Must be at least 3 characters long');
            done();
            });
        });
    });

    describe('Admin sign Up', () => {
        it('should not be able to POST a new admin sign up', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signup')
            .send(admin5)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('Must be at least 3 characters long');
            done();
            });
        });
    });
    describe('Admin sign Up', () => {
        it('should not be able to POST a new admin sign up', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signup')
            .send(admin6)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.error.should.equal('Password should be atleast six characters');
            done();
            });
        });
    });

    describe('Admin sign In', () => {
        it('should POST a new admin sign in', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signin')
            .send(admin)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
            });
        });
    });

    describe('Admin sign In', () => {
        it('should not be able to POST a new admin sign in', (done) => {
            chai.request(app)
            .post('/api/v1/admin/auth/signin')
            .send(admin7)
            .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.equal('Email does not exist');
            done();
            });
        });
    });
});