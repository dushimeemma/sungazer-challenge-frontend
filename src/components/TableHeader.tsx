import React from 'react';
import { Col } from 'reactstrap';

interface Props {
  text: string;
  classes?: string;
}

const TableHeader = ({ text, classes }: Props) => {
  return (
    <Col md={2} sm={2} className={classes}>
      <h6 className='text-center'>{text}</h6>
    </Col>
  );
};

export default TableHeader;
