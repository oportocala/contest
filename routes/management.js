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

router.get('/health-check', (req, res) => {
  res.writeHead(200);
  res.end('OK');
});

module.exports = router;
