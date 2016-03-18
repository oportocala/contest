import isValidEmailString from 'valid-email';


export const extractData = (req) => new Promise(
  (resolve, reject) => {
    if (!req.body || !req.body.email || !req.params.slug) {
      reject({error: 'Missing params.'});
    }

    let {email} = req.body;
    let {slug} = req.params;

    resolve({slug, email});
  }
);

export const sanitizeData = (data) => {
  const email = data.email.trim().toLowerCase().replace(/[^a-z0-9-@.]/g, '');
  const slug = data.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  return { email, slug };
};

const isValidContestant = contestant => new Promise((resolve, reject) => {
  if (contestant.finalist === true) {
    resolve(contestant);
  } else {
    reject('Not a finalist');
  }
});

const canVote = (emailExists) => new Promise((resolve, reject) => {
  if (emailExists) {
    return reject('Already voted');
  }
  resolve();
});

export const isValidVote = (data, store) => new Promise(function (resolve, reject) {
  const {email, slug} = data;

  if (!isValidEmailString(email)) {
    return reject('Invalid email');
  }

  store.getContestantBySlug(slug, store)
    .then(isValidContestant)
    .then(() => store.emailExists(email))
    .then(canVote)
    .then(() => resolve(data))
    .catch(reject);

 // setTimeout(() => resolve(data), 1000);
});

export function onValid (data) {
  console.log('Valid vote for', data.slug, 'by', data.email);
  return data;
}

export const saveVote = (data) => new Promise((resolve, reject) => {
  resolve(data);
});

export function onSave (data) {
  console.log('Vote saved for', data.slug, ' by ', data.email);
  return true;
}
