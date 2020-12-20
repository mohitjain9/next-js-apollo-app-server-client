import mongo from 'mongodb';
import Grid from 'gridfs-stream';

export let client = new mongo.MongoClient(process.env.MONGODB_URI, {useNewUrlParser: true});

let gfsResolve;
let gfs;
let db;
let dbResolve;

client.connect((err) => {
  db = client.db('fsgrid');
  if (dbResolve) {
    dbResolve(db);
  }
  gfs = Grid(db, mongo);
  gfs.collection('ctFiles');
  if (gfsResolve) {
    gfsResolve(gfs);
  }
});

export const getGFS = () => {
  return new Promise((resolve) => {
    if (gfs) {
      resolve(gfs);
    }
    gfsResolve = resolve;
  });
};

export const getDB = () => {
  return new Promise((resolve) => {
    if (db) {
      resolve(db);
    }
    dbResolve = resolve;
  });
};
