import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { PageContainer } from './styled/styled';

const EditMenu = () => {
  return (
    <PageContainer>
      <div className='container' style={{display:'flex', justifyContent:'space-between'}} >
        <h1>Edit Menu</h1>
        <div>
          <Button as={Link} to="/menuitems/new" href="/menuitems/new">New Menu Item</Button>
        </div>
      </div>
      <Menu hideHeading='true' variant='edit'/>
    </PageContainer>
  );
};

export default EditMenu;