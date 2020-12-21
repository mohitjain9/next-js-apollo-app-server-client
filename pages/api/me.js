import {getLoginSession} from '../../server/lib/auth';
import {findUser} from '../../server/lib/user';

export default async function handler(req, res) {
  const session = await getLoginSession(req);
  if (session) {
    const [currentUser] = await findUser(session.email);
    if (currentUser) {
      return res.status(200).json(currentUser);
    }
  }
  res.status(401).json('Not Authorized');
}
