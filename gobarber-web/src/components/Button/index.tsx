import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Buttonprops> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
