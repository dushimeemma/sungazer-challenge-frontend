import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/TextInput';
import Button from '../components/Button';
import Alert from '../components/Alert';
import PasswordInput from '../components/PasswordInput';
import AlertErrors from '../components/AlertErrors';
import AlertSuccess from '../components/AlertSuccess';
import { loginUser, Auth } from '../redux/actions/auth';
import { clearErrors } from '../redux/actions/errors';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(false);
  const { isLoading, message, token } = useSelector((state: any) => state.auth);
  const { error } = useSelector((state: any) => state.errors);
  const handleViewPassword = () => {
    setEye(!eye);
  };
  const handleOpenRegister = () => {
    history.push('/register');
  };
  const handleLoginUser = (user: Auth) => {
    dispatch(loginUser(user));
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
    <Container className='w-full h-full p-5'>
      <Row className='w-full h-full p-5 m-5 bg-secondary rounded'>
        <Col md={6} sm={1} />
        <Col md={6} sm={1} className='bg-light rounded'>
          <h3 className='text-center capitalize my-3'>
            Login To Sungazer Transactions
          </h3>
          {message && (
            <AlertSuccess message={message} handleClearMessages={() => {}} />
          )}
          {error && (
            <AlertErrors error={error} handleClearErrors={handleClearErrors} />
          )}
          <hr />
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLoginUser}
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
                <Button title='Login' type='submit' isLoading={isLoading} />
                <p className='text-center text-capitalize'>
                  Doesn't Have an Account?
                  <a
                    className='btn btn-sm btn-light rounded'
                    onClick={handleOpenRegister}
                  >
                    SignUp
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
