import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from './auth/login';

export default function Index() {
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(`/auth/login`);
    }
    else {
      navigate('/dashboard');
    }
  }),
    [];
  return <div />;
}
