import React, { useState } from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Link } from 'gatsby';
import { postResetPassword } from '../../components/NekrasovkaApiCaller'
import SEO from '../../components/SEO';
import Auth, { Group } from '../../components/Auth';

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [resetToken, setResetToken] = useState(new URLSearchParams(window.location.search).get('reset_token'))

  return (
    <Auth title="Change Password" subTitle="Please set a new password">
      <SEO title="Change Password" />
      <form>
        <InputGroup fullWidth>
          <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
        </InputGroup>
        <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={()=>postResetPassword({password: password, resetToken: resetToken})}>
          Change Password
        </Button>
      </form>
      <Group>
        <Link to="/auth/login">Back to Log In</Link>
        <Link to="/auth/register">Register</Link>
      </Group>
    </Auth>
  );
}
