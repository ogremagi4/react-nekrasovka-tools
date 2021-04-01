import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import moment from 'moment'

import Auth from '../../components/Auth';
import SEO from '../../components/SEO';
import Socials from '../../components/Auth/Socials';
import { postUser } from '../../components/NekrasovkaApiCaller';

const Input = styled(InputGroup)`
  margin-bottom: 2rem;
`;

export default function Register() {
  const [email, setEmail] = useState()
  const [realName, setRealName] = useState()
  const [dateOfBirth, setDateOfBirth] = useState(moment().locale('en').format('YYYY-MM-DD'))
  const [password, setPassword] = useState()
  const [agreed, setAgreed] = useState(false)

  const buttonClick = () => {
    postUser({
      email:email, 
      realName: realName,
      dateOfBirth:dateOfBirth,
      password: password
    }).then(
      (result) => {
        navigate('/eds');
      },
      (error) => {}
    );
  }

  return (
    <Auth title="Create new account">
      <SEO title="Register" />
      <form>
        <Input fullWidth>
          <input type="email" placeholder="Email Address" onChange={e=>setEmail(e.target.value)}/>
        </Input>
        <Input fullWidth>
          <input type="text" placeholder="Фамилия Имя Отчество (cyrillic)" onChange={e=>setRealName(e.target.value)} />
        </Input>
        <Input fullWidth>
          <label>Date of birth:</label>
          <input type="date" placeholder="Date of birth" onChange={e=>setDateOfBirth(e.target.value)}/>
        </Input>
        <Input fullWidth>
          <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        </Input>
        <Checkbox onChange={(val) => setAgreed(val)} checked={agreed}>
          Согласен на обработку персональных данных в соответствии с <Link to="http://nekrasovka.ru/file/1574376321.pdf">политикой в отоношении персональных данных</Link>
        </Checkbox>
        <Button status="Success" 
                type="button" 
                shape="SemiRound" 
                fullWidth 
                disabled={[email, realName,, dateOfBirth, password, agreed].some((x) => {return !Boolean(x);})}
                onClick={buttonClick}    
            >
          Register
        </Button>
      </form>
      <p>
        Already have an account? <Link to="/auth/login">Log In</Link>
      </p>
    </Auth>
  );
}
