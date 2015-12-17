/* jshint -W079 */
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Auction = mongoose.model('Auction');

/**
 * Globals
 */
var user;
var auction;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Auction:', function() {
    beforeEach(function(done) {
      this.timeout(10000);
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      user.save(function() {
        auction = new Auction({
          title: 'Auction Title',
          content: 'Auction Content',
          user: user
        });
        done();
      });


    });
    describe('Method Save', function() {

      it('should be able to save without problems', function(done) {
        this.timeout(10000);

        return auction.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.title).to.equal('Auction Title');
          expect(data.content).to.equal('Auction Content');
          expect(data.user.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });

      });

      it('should be able to show an error when try to save without title', function(done) {
        this.timeout(10000);
        auction.title = '';

        return auction.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        this.timeout(10000);
        auction.content = '';

        return auction.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        this.timeout(10000);
        auction.user = {};

        return auction.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(10000);
      auction.remove(function() {
        user.remove(done);
      });
    });
  });
});
