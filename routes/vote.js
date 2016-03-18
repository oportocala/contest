import express from 'express';
const router = express.Router();

import * as store from '../src/store';
import { extractData, sanitizeData, isValidVote, onValid, saveVote, onSave } from '../src/vote';

router.post('/:slug', (req, res) => {

  extractData(req)
    .then(sanitizeData)
    .then((data) => isValidVote(data, store))
    .then(onValid)
    .then((data) => store.saveVote(data))
    .then(onSave)
    .then(() => {
      res.json({success: true});
    })
    .catch((error) => {
      res.json({success: false, error});
    });

});

module.exports = router;
