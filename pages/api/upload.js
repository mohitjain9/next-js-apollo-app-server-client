import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import {getGFS} from '../../server/db';
import {getLoginSession} from '../../server/lib/auth';

async function getUplaod() {
  const gfs = await getGFS();

  const storage = GridFsStorage({
    gfs,
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(
        null,
        file.fieldname +
          '-' +
          datetimestamp +
          '.' +
          file.originalname.split('.')[file.originalname.split('.').length - 1],
      );
    },
    /** With gridfs we can store aditional meta-data along with the file */
    metadata: function (req, file, cb) {
      cb(null, {originalname: file.originalname, user: req.user});
    },
    root: 'ctFiles', //root name for collection to store files into
  });

  return multer({
    storage,
    limits: {fileSize: 5242880},
  }).single('file');
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req, res) {
  const upload = await getUplaod();
  const session = await getLoginSession(req);

  if (session && upload) {
    req.user = session;
    return upload(req, res, function (err) {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).end('Too Large File....');
        }
        return res.status(500).json('Internal Server Error');
      }
      res.json({uploaded: 1});
    });
  }
  res.status(500).end('Internal Server Error');
}
