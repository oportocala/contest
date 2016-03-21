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

export const validateDataTypes = (data) => new Promise((resolve, reject) => {
  const {email, slug} = data;
  if (typeof email === 'string' && typeof slug === 'string') {
    resolve(data);
  } else {
    reject('Invalid data type/s');
  }
});

export const sanitizeData = (data) => {
  const email = data.email.trim().toLowerCase().replace(/[^a-z0-9-@.]/g, '');
  const slug = data.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  return { email, slug };
};

export const validateContentTypes = data => new Promise((resolve, reject) => {
  if (!isValidEmailString(data.email)) {
    reject('Invalid email');
  } else {
    resolve(data);
  }
});

export const isValidContestant = contestant => new Promise((resolve, reject) => {
  if (contestant.finalist === true) {
    resolve(contestant);
  } else {
    reject('Not a finalist');
  }
});

export const isValidEmail = emailExists => new Promise((resolve, reject) => {
  if (emailExists) {
    return reject('Already voted');
  }
  resolve();
});
