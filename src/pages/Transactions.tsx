import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Transactions = () => {
  const history = useHistory();
  if (!localStorage.getItem('token')) {
    history.push('/');
  }
  return (
    <Container>
      <h3 className='text-center'>Hello from Transactions</h3>
    </Container>
  );
};

export default Transactions;
