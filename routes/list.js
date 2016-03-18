import express from 'express';
const router = express.Router();

import * as store from '../src/store';

const toCSV = (data) => {
   return '... :) ...';
};

router.get('/votes/json', (req, res) => {
  store.getVotes()
    .then((data) => {
      res.json(data);
    });
});

router.get('/votes/cvs', (req, res) => {
  store.getVotes()
    .then((data) => {
      res.send(toCSV(data))
      res.end();
    });
});

router.get('/votes', (req, res) => {
  store.getVotes()
    .then((data) => {
      res.render('votes', { data: data });
    });
});

router.get('/top', (req, res) => {
  store.getTop()
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
