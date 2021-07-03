import React from 'react';
import { FormGroup, Label, Input, Container } from 'reactstrap';

interface Props {
  label: string;
  type: any;
  name: string;
  placeholder: string;
  labelFor: string;
  onChange?: any;
  value?: any;
  onBlur?: any;
  eye?: boolean;
  handleViewPassword?: any;
}

const TextInput = ({
  label,
  type,
  name,
  placeholder,
  labelFor,
  onChange,
  value,
  onBlur,
  eye,
  handleViewPassword,
}: Props) => {
  return (
    <FormGroup>
      <Container className='d-flex justify-content-between my-1'>
        <Label for={labelFor}>{label}</Label>
        <button
          className='float-right btn btn-sm btn-light'
          onClick={handleViewPassword}
          type='button'
        >
          <i className={eye ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
        </button>
      </Container>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </FormGroup>
  );
};

export default TextInput;
