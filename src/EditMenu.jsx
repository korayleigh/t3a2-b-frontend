import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const EditMenu = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className='container' style={{display:'flex', justifyContent:'space-between'}} >
        <h1>Edit Menu</h1>
        <div>
          <Button as={Link} to="/menuitems/new" href="/menuitems/new">New Menu Item</Button>
        </div>
      </div>
      <Menu hideHeading='true' variant='edit'/>
    </>
  );
};

export default EditMenu;