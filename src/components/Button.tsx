import React from 'react';

import { Button, Spinner } from 'reactstrap';

interface Props {
  title: string;
  classes?: string;
  onClick?: any;
  type?: any;
  isLoading?: boolean;
}

const PressButton = ({ title, classes, onClick, type, isLoading }: Props) => {
  return (
    <Button className={`my-3 ${classes}`} onClick={onClick} type={type}>
      {isLoading ? <Spinner color='light' size='sm' /> : title}
    </Button>
  );
};

export default PressButton;
