import {getGFS} from '../../server/db';
import {getLoginSession} from '../../server/lib/auth';

export default async function (req, res) {
  const gfs = await getGFS();
  const sessionUser = await getLoginSession(req);

  if (sessionUser) {
    return gfs.files.find({'metadata.user.id': sessionUser.id}).toArray(function (err, files) {
      if (err) {
        res.status(500).send('Internal Server Error');
      }
      res.json(files);
    });
  }

  return res.status(401).send('Not Authorized');
}
