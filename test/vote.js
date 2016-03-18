import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

const expect = chai.expect;
chai.use(chaiAsPromised);

import { extractData, sanitizeData } from '../src/vote';

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
});
