const contestants = {
  'ray': {
    name: 'Ray Chan',
    finalist: true,
  },
  'july': {
    name: 'Jully When',
    finalist: true,
  },
  'james': {
    name: 'James Joice',
    finalist: true,
  }
};

const votes = [
  {timestamp: new Date(), 'for': 'ray', email: 'oportocala1@gmail.com'},
  {timestamp: new Date(), 'for': 'july', email: 'antorant@gmail.com'},
  {timestamp: new Date(), 'for': 'james', email: 'niels@gmail.com'},
];

const aggregated = {
  'ray': 1000,
  'july': 2000,
  'james': 2300
}

export const loadContestants = () => {
  // probably rely on contentful to get objects
}

export const getVotes = () => new Promise((resolve, reject) => {
  resolve(votes);
});

export const getTop = () => new Promise((resolve, reject) => {
  const sortedKeys = Object.keys(aggregated)
    .sort(function(a,b){return aggregated[b] - aggregated[a]})
  resolve(sortedKeys.map((key) => {
    return {
      slug: key,
      name: contestants[key].name,
      votes: aggregated[key],
    }
  }));
});

export const getContestantBySlug = (slug) => new Promise((resolve, reject) => {
  if (contestants[slug]) {
    resolve(contestants[slug])
  } else {
    reject('Contestant not found');
  }
});

export const emailExists = (email) => new Promise((resolve) => {
  const emailIndex = votes.findIndex( (entry) => entry.email === email);
  resolve(emailIndex !== -1);
});

export const saveVote = (data) => new Promise((resolve) => {
  votes.push({
    timestamp: new Date(),
    'for': data.slug,
    email: data.email,
  });

  aggregated[data.slug]++;

  resolve(data);
});
