import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user } = useAuth();

  formRef.current?.setErrors({});
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória').min(6, 'Deve conter ao menos 6 caracteres'),
          old_password: Yup.string().required('Senha obrigatória').min(6, 'Deve conter ao menos 6 caracteres'),
          password_confirmation: Yup.string().required('Senha obrigatória').min(6, 'Deve conter ao menos 6 caracteres'),
        });
        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);
        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoBarber',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          console.error(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form initialData={{ name: user.name, email: user.email }} onSubmit={handleSubmit} ref={formRef}>
          <AvatarInput>
            <img
              src="https://avatars2.githubusercontent.com/u/5588353?s=460&u=53e8e3188f8cc9997488bff17c7b7129cf9560de&v=4"
              alt={user.name}
            />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu Perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
            containerStyle={{ marginTop: 24 }}
          />
          <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
          <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
