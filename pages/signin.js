import Link from 'next/link';
import Field from '../client/components/Field';
import {useSingIn} from '../client/hooks';

function SignIn() {
  const [errorMsg, handleSubmit] = useSingIn();

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field name="email" type="email" autoComplete="email" required label="Email" />
        <Field name="password" type="password" autoComplete="password" required label="Password" />
        <button type="submit">Sign in</button> or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
