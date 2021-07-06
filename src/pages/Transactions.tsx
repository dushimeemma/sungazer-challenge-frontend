import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import Sidebar from '../components/markup/Sidebar';
import TH from '../components/TableHeader';
import Depose from './modals/Depose';
import Withdraw from './modals/Withdraw';
import { getTransactionsByUser, clearMessage } from '../redux/actions/auth';
import { clearErrors } from '../redux/actions/errors';

const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deposeModal, setDeposeModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const { transactions, isLoading } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getTransactionsByUser());
    }
  }, []);
  const toggleDepose = () => {
    dispatch(clearErrors());
    dispatch(clearMessage());
    setDeposeModal(!deposeModal);
  };

  const toggleWithdraw = () => {
    dispatch(clearErrors());
    dispatch(clearMessage());
    setWithdrawModal(!withdrawModal);
  };

  return (
    <Row className='min-height'>
      <Sidebar />
      <Col md={9} sm={1}>
        <Container className='bg-light border-0 rounded m-auto mt-5'>
          {isLoading ? (
            <div className='spinner'>
              <Spinner type='grow' color='secondary' />
            </div>
          ) : (
            <>
              <div className='d-flex justify-content-between my-5'>
                <Depose
                  buttonLabel='depose'
                  toggle={toggleDepose}
                  modal={deposeModal}
                />
                <h3 className='text-capitalize text-center'>
                  All transactions
                </h3>
                <Withdraw
                  buttonLabel='withdraw'
                  toggle={toggleWithdraw}
                  modal={withdrawModal}
                />
              </div>
              {transactions.length ? (
                <>
                  <Row>
                    <TH text='#' classes='mb-2' />
                    <TH text='Description' classes='mb-2' />
                    <TH text='Amount Withdrawn' classes='mb-2' />
                    <TH text='Amount Deposited' classes='mb-2' />
                    <TH text='Balance' classes='mb-2' />
                    <TH text='Action' classes='mb-2' />
                  </Row>
                  {transactions.map((transaction: any, index: number) => (
                    <Row key={transaction.id}>
                      <TH text={`${index + 1}`} />
                      <TH text={transaction.description} />
                      <TH text={`$${transaction.amount_withdrawn}`} />
                      <TH text={`$${transaction.amount_deposited}`} />
                      <TH text={`$${transaction.balance}`} />
                      <Col
                        md={2}
                        sm={2}
                        className='d-flex justify-content-center'
                      >
                        <img
                          src={
                            'https://firebasestorage.googleapis.com/v0/b/task-force-93e06.appspot.com/o/ActionButton.svg?alt=media&token=08e94cfc-db1e-4158-9075-7633d1f5d65b'
                          }
                          alt='action'
                          className='action btn btn-sm btn-light'
                        />
                      </Col>
                    </Row>
                  ))}
                </>
              ) : null}
            </>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default Transactions;
