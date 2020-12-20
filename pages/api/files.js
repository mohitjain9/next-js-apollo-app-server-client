import {getGFS} from '../../server/db';

export default async function (req, res) {
  const gfs = await getGFS();
  
  gfs.files.find({}).toArray(function (err, files) {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.json(files);
  });
}
