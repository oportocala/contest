import express from 'express';
const router = express.Router();

import * as store from '../src/store';

router.get('/reload-contestants', (req, res) => {
  store.loadContestants()
    .then(() => {
      res.json({success: true});
    })
    .catch((error) => {
      res.json({success: false, error});
    });
});

module.exports = router;
