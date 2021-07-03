import React from 'react';

import Alert from './Alert';

interface Props {
  error: string;
  handleClearErrors: any;
}

const AlertErrors = ({ error, handleClearErrors }: Props) => {
  return (
    <div className='alert alert-danger d-flex justify-content-between'>
      <Alert
        text={`${error}`}
        classes='text-light text-center text-capitalize'
      />
      <button
        className='btn btn-sm btn-danger text-white rounded'
        type='button'
        onClick={handleClearErrors}
      >
        <i className='fas fa-times'></i>
      </button>
    </div>
  );
};

export default AlertErrors;
