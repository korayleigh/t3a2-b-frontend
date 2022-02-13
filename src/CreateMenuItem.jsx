import React from 'react';
import MenuItemForm from './components/MenuItemForm';
import { PageContainer } from './styled/styled';

const CreateMenuItem = () => {

  return (
    <PageContainer className="my-5">
      <h1>New Menu Item</h1>
      <MenuItemForm />
    </PageContainer>
  );
};

export default CreateMenuItem;