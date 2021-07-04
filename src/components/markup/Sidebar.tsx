import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import { useHistory } from 'react-router-dom';

import { logout } from '../../redux/actions/auth';

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  if (!localStorage.getItem('token')) {
    history.push('/');
  }
  const [dropdownOpen, setOpen] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    setTimeout(() => {
      history.push('/');
    }, 500);
  };
  const toggle = () => setOpen(!dropdownOpen);
  return (
    <Col md={3} sm={1} className='bg-light border border-right-0'>
      <Row className='d-flex flex-column justify-content-around'>
        <Col className='top-div'>
          <h1 className='mt-2 mb-5 mx-2 font-italic'>
            SUNGAZER <br /> Transactions
          </h1>
          <div className='w-full'>
            <h5 className='ml-3 font-italic cursor-pointer'>
              <button className='btn btn-sm btn-light mx-2'>
                <i className='fas fa-wallet'></i>
              </button>
              Transactions
            </h5>
            <hr />
          </div>
        </Col>
        <div className='bg-secondary card py-2 text-light'>
          <button className='avatar btn btn-light btn-sm'>
            <i className='fas fa-user-tie'></i>
          </button>
          <div>
            <h6 className='font-italic'>{user.name}</h6>
            <h6 className='font-italic'>{user.username}</h6>
          </div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret className='btn btn-sm btn-light' />
            <DropdownMenu>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </Row>
    </Col>
  );
};

export default Sidebar;
