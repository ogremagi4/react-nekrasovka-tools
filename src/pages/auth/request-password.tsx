import React, { useState } from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Link } from 'gatsby';
import { postForgotPassword } from '../../components/NekrasovkaApiCaller'
import SEO from '../../components/SEO';
import Auth, { Group } from '../../components/Auth';



export default function RequestPassword() {
  const [email, setEmail] = useState('')

  return (
    <Auth title="Forgot Password" subTitle="Enter your email address and we’ll send a link to reset your password">
      <SEO title="Forgot Password" />
      <form>
        <InputGroup fullWidth>
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
        </InputGroup>
        <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={()=>postForgotPassword({
          email: email
        })}>
          Request Password
        </Button>
      </form>
      <Group>
        <Link to="/auth/login">Back to Log In</Link>
        <Link to="/auth/register">Register</Link>
      </Group>
    </Auth>
  );
}
