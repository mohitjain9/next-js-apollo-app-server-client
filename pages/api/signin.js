import {findUser, validatePassword} from '../../server/lib/user';
import {setLoginSession} from '../../server/lib/auth';

export default function userHandler(req, res) {
  const {method} = req;
  switch (method) {
    case 'POST':
      return handleSingIn(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleSingIn(req, res) {
  const {
    body: {email, password},
    method,
  } = req;
  const [user] = await findUser(email);
  if (user && (await validatePassword(user, password))) {
    const session = {
      id: user.id,
      email: user.email,
    };
    await setLoginSession(res, session);

    return res.send({user});
  }
  res.status(401).send('Not Authorized');
}
