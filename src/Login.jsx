import React from 'react';
import LoginForm from './components/LoginForm';
import { PageContainer } from './styled/styled';


const Login = () => {
  return (
    <PageContainer>
      <h1>Login</h1>
      <LoginForm />
    </PageContainer>
  );
};

export default Login;

