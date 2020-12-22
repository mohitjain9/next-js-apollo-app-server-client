import Link from 'next/link';
import Field from '../client/components/Field';
import {useSingUp} from '../client/hooks';

function SignUp() {
  const [errorMsg, handleSubmit] = useSingUp();

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field name="email" type="email" autoComplete="email" required label="Email" />
        <Field name="password" type="password" autoComplete="password" required label="Password" />
        <button type="submit">Sign up</button> or{' '}
        <Link href="signin">
          <a>Sign in</a>
        </Link>
      </form>
    </div>
  );
}
export default SignUp;
