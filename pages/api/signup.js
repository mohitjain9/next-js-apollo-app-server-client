import {createUser} from '../../server/lib/user';

export default async function userHandler(req, res) {
  const {
    body: {email, password},
    method,
  } = req;

  switch (method) {
    case 'POST':
      const user = await createUser({email, password});
      if (!user) {
        return res.status(400).json('Alredy Exist');
      }
      res.status(200).json({user});
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
