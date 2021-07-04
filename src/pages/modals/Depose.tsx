import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../../components/TextInput';
import Alert from '../../components/Alert';
import AlertSuccess from '../../components/AlertSuccess';
import AlertErrors from '../../components/AlertErrors';
import SubmitButton from '../../components/Button';
import {
  deposeAmount,
  getTransactionsByUser,
  clearMessage,
} from '../../redux/actions/auth';
import { clearErrors } from '../../redux/actions/errors';

interface Props {
  toggle: any;
  className?: any;
  buttonLabel: any;
  modal: boolean;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label('Description'),
  amount: Yup.number().required().label('Amount'),
});

const Depose = ({ toggle, className, buttonLabel, modal }: Props) => {
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector((state: any) => state.auth);
  const { error } = useSelector((state: any) => state.errors);

  const handleSubmitDeposit = (deposit: any) => {
    const newDeposit = {
      description: deposit.description,
      amount: parseInt(deposit.amount),
    };
    dispatch(deposeAmount(newDeposit));
    setTimeout(() => {
      dispatch(getTransactionsByUser());
    }, 500);
  };

  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  const handleHandleClearMessage = () => {
    dispatch(clearMessage());
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-sm btn-primary rounded'
        onClick={toggle}
      >
        {buttonLabel}
      </button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          Depose <br />
          {message && (
            <AlertSuccess
              message={message}
              handleClearMessages={handleHandleClearMessage}
            />
          )}
          {error && (
            <AlertErrors error={error} handleClearErrors={handleClearErrors} />
          )}
        </ModalHeader>
        <Formik
          initialValues={{ description: '', amount: '' }}
          onSubmit={handleSubmitDeposit}
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
              <ModalBody>
                <Input
                  label='Description'
                  type='text'
                  name='description'
                  placeholder='description'
                  labelFor='description'
                  onChange={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
                {touched.description && errors.description && (
                  <Alert
                    classes='text-capitalize'
                    text={`${errors.description}`}
                  />
                )}
                <Input
                  label='Amount'
                  type='text'
                  name='amount'
                  placeholder='amount'
                  labelFor='amount'
                  onChange={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  value={values.amount}
                />
                {touched.amount && errors.amount && (
                  <Alert classes='text-capitalize' text={`${errors.amount}`} />
                )}
              </ModalBody>
              <ModalFooter>
                <SubmitButton
                  classes='btn btn-primary'
                  type='submit'
                  onClick={toggle}
                  isLoading={isLoading}
                  title='Depose'
                />

                <Button color='danger' onClick={toggle} type='button'>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Depose;
