import React from 'react';

import Alert from './Alert';

interface Props {
  message: string;
  handleClearMessages: any;
}

const AlertSuccess = ({ message, handleClearMessages }: Props) => {
  return (
    <div className='alert alert-success d-flex justify-content-between'>
      <Alert
        text={`${message}`}
        classes='text-light text-center text-capitalize'
      />
      <button
        className='btn btn-sm btn-success text-white rounded'
        type='button'
        onClick={handleClearMessages}
      >
        <i className='fas fa-times'></i>
      </button>
    </div>
  );
};

export default AlertSuccess;
