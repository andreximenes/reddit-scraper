'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


const server = require('../src/server')

describe('Checking if server is running', () => {
  it('Returns a 200 response', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        if (error) done(error);
        // Now let's check our response
        expect(response).to.have.status(200);
        done();
      });
  });

  it('Start the scrap. It should return HTTP 200 OK ', (done) => {
    chai.request(server)
      .get('/api/v1/posts/scrape')
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(200);
        expect(response.body.message).to.not.empty
        done();
      });
  });

  it('Get all posts ', (done) => {
    chai.request(server)
      .get('/api/v1/posts/all')
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(200);
        expect(response.body.data.length).to.be.greaterThanOrEqual(25)
        done();
      });
  });

});
