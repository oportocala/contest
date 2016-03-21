import express from 'express';
const router = express.Router();

import { getContestantBySlug, emailExists, saveVote }  from '../src/store';
import {
  extractData,
  validateDataTypes,
  validateContentTypes,
  sanitizeData,
  isValidContestant,
  isValidEmail
} from '../src/vote';


function logValid (data) {
  console.log('Valid vote for', data.slug, 'by', data.email);
  return data;
}

function logSave (data) {
  console.log('Vote saved for', data.slug, ' by ', data.email);
  return true;
}

const checkContestant = (data) => new Promise( (resolve, reject) => {
  getContestantBySlug(data.slug)
    .then(isValidContestant)
    .then(() => resolve(data))
    .catch(reject);
});

const checkEmail = (data) => new Promise( (resolve, reject) => {
  emailExists(data.email)
    .then(isValidEmail)
    .then(() => resolve(data))
    .catch(reject);
});

router.post('/:slug', (req, res) => {

  extractData(req)
    .then(validateDataTypes)
    .then(validateContentTypes)
    .then(sanitizeData)
    .then(checkContestant)
    .then(checkEmail)
    .then(logValid)
    .then(saveVote)
    .then(logSave)
    .then(() => {
      res.json({success: true});
    })
    .catch((error) => {
      res.json({success: false, error});
    });

});

module.exports = router;
