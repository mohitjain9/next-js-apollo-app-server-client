import crypto from 'crypto';
import {v4 as uuidv4} from 'uuid';
import {getDB} from '../db';

let userCollection;

const getUserCollection = async () => {
  if (userCollection) {
    return userCollection;
  }
  userCollection = await getDB().then((db) => db.collection('users'));
  return userCollection;
};

export const findUser = (email) =>
  getUserCollection().then((userCollection) => {
    return new Promise((resolve, reject) =>
      userCollection.find({email}).toArray(function (err, result) {
        if (err) reject(err);
        resolve(result);
      }),
    );
  });

export async function createUser({email, password}) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const existingUser = await findUser(email);
  if (!existingUser.length) {
    const userCollection = await getUserCollection();
    const user = {
      id: uuidv4(),
      createdAt: Date.now(),
      email,
      hash,
      salt,
    };
    const userInsert = await new Promise((resolve, reject) => {
      userCollection.insertOne(user, function (err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
    return user;
  }
}

export async function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
