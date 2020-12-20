import {removeTokenCookie} from '../../server/lib/auth-cookies';

export default function userHandler(req, res) {
  removeTokenCookie(res);
  res.end();
}
