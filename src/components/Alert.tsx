import React from 'react';

interface Props {
  text: string;
  classes?: string;
}

const Alert = ({ text, classes }: Props) => {
  return <div className={`text-danger ${classes}`}>{text}</div>;
};

export default Alert;
