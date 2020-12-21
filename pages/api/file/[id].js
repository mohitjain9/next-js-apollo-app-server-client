import {ObjectID} from 'mongodb';
import {getGFS} from '../../../server/db';

export default async (req, res) => {
  const gfs = await getGFS();
  gfs.files.find({_id: new ObjectID(req.query.id)}).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: 'error',
      });
    }
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: 'ctFiles',
    });
    res.setHeader('Content-Type', files[0].contentType);
    res.setHeader('Cache-Control', 'max-age=31536000');
    return readstream.pipe(res);
  });
};
