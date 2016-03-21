import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

const expect = chai.expect;
chai.use(chaiAsPromised);

import { extractData, sanitizeData, validateDataTypes, validateContentTypes, isValidEmail } from '../src/vote';

describe('Vote functions', function() {
  describe('#extractData', function () {
    it('should reject invalid request', function () {
      expect(extractData({})).to.be.rejected;
      expect(extractData({ body: {}})).to.be.rejected;
      expect(extractData({ body: {}, params: {}})).to.be.rejected;
      expect(extractData({ body: {email: 'EMAIL'}, params: {}})).to.be.rejected;
      expect(extractData({ body: {email: 'EMAIL'}, params: {slag: 'typo'}})).to.be.rejected;
    });

    it('should return data from a request', function () {
      const req = {
        body: {
          email: 'EMAIL'
        },
        params: {
          slug: 'SLUG'
        }
      };
      expect(extractData(req)).to.eventually.equal({email: 'EMAIL', slug: 'SLUG'});
    });

  });

  describe('#sanitizeData', () => {
    it('should trim whitespace', () => {
      expect(sanitizeData({email: ' oportocala@gmail.com', slug: '' })).to.deep.equal({email: 'oportocala@gmail.com', slug: ''});
    });
    it('should remove non-alpha-number chars', () => {
      expect(sanitizeData({email: ' opor$#tocala@gmail.com', slug: '@#$' })).to.deep.equal({email: 'oportocala@gmail.com', slug: ''});
    });
    it('should make everything lower-case', () => {
      expect(sanitizeData({email: ' OPOR$#tocala@gmail.com', slug: '@#$AA' })).to.deep.equal({email: 'oportocala@gmail.com', slug: 'aa'});
    })
  });

  describe('#validateDataTypes', () => {
    it('should check both are strings', () => {
      expect(validateDataTypes({email: 1, slug: '' })).to.be.rejected;
      expect(validateDataTypes({email: true, slug: 'asd' })).to.be.rejected;
      expect(validateDataTypes({email: '', slug: 1 })).to.be.rejected;
      expect(validateDataTypes({email: '', slug: null })).to.be.rejected;
      expect(validateDataTypes({email: '', slug: '' })).to.eventually.equal({email: '', slug: ''});
    });
  });

  describe('#validateContentTypes', () => {
    it('check email, return promise', () => {
      expect(validateContentTypes({email: 'oportocala', slug: '' })).to.be.rejected;
      expect(validateContentTypes({email: 'oportocala@', slug: '' })).to.be.rejected;
      expect(validateContentTypes({email: 'oportocala@test', slug: '' })).to.be.rejected;
      expect(validateContentTypes({email: 'oportocala@gmail.com', slug: '' })).to.eventually.equal({email: 'oportocala@gmail.com', slug: '' });
    });
  });

  describe('#isValidContestant', () => {
    it('check contestant, return promise', () => {
      expect(validateContentTypes({finalist: false})).to.be.rejected;
      expect(validateContentTypes({finalist: true, name: 'ray'})).to.eventually.equal({finalist: true, name: 'ray'});
    });
  });

  describe('#isValidEmail', () => {
    it('check that email does not exist, return promise', () => {
      expect(isValidEmail(true)).to.be.rejected;
      expect(isValidEmail(false)).to.eventually.equal(true);
    });
  });
});
