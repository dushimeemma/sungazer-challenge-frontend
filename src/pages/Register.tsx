import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import Alert from '../components/Alert';
import AlertErrors from '../components/AlertErrors';
import AlertSuccess from '../components/AlertSuccess';
import { registerNewUser, User } from '../redux/actions/auth';
import { clearErrors } from '../redux/actions/errors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Full Name'),
  username: Yup.string().required().label('Username'),
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(false);
  const { isLoading, message, token } = useSelector((state: any) => state.auth);
  const { error } = useSelector((state: any) => state.errors);
  const handleOpenLogin = () => {
    history.push('/');
  };
  const handleViewPassword = () => {
    setEye(!eye);
  };
  const handleRgisterNewUser = (user: User) => {
    dispatch(registerNewUser(user));
  };
  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        history.push('/transactions');
      }, 500);
    }
  }, [token]);

  return (
    <Container className='w-full h-full p-3'>
      <Row className='w-full h-full p-3 m-2 bg-secondary rounded'>
        <Col md={6} className='bg-light rounded'>
          <h3 className='text-center text-capitalize my-3'>
            Create Account To Sungazer Transactions
          </h3>
          {message && (
            <AlertSuccess message={message} handleClearMessages={() => {}} />
          )}
          {error && (
            <AlertErrors error={error} handleClearErrors={handleClearErrors} />
          )}
          <hr />
          <Formik
            initialValues={{ name: '', username: '', email: '', password: '' }}
            onSubmit={handleRgisterNewUser}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Input
                  label='name'
                  type='text'
                  name='name'
                  placeholder='sample name'
                  labelFor='name'
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Alert classes='text-capitalize' text={`${errors.name}`} />
                )}
                <Input
                  label='username'
                  type='text'
                  name='username'
                  placeholder='sampleusername'
                  labelFor='username'
                  onChange={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <Alert
                    classes='text-capitalize'
                    text={`${errors.username}`}
                  />
                )}
                <Input
                  label='email'
                  type='email'
                  name='email'
                  placeholder='sample@email.email'
                  labelFor='email'
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Alert classes='text-capitalize' text={`${errors.email}`} />
                )}
                <PasswordInput
                  label='password'
                  type={eye ? 'text' : 'password'}
                  name='password'
                  placeholder='password'
                  labelFor='password'
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  eye={eye}
                  handleViewPassword={handleViewPassword}
                />
                {touched.password && errors.password && (
                  <Alert
                    classes='text-capitalize'
                    text={`${errors.password}`}
                  />
                )}
                <Button title='SignUp' type='submit' isLoading={isLoading} />
                <p className='text-center text-capitalize'>
                  Already Have an Account?
                  <a
                    className='btn btn-sm btn-light rounded'
                    onClick={handleOpenLogin}
                  >
                    Login
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </Col>
        <Col md={6} />
      </Row>
    </Container>
  );
};

export default Register;
