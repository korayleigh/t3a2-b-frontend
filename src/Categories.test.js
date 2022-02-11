import React from 'react';
import {
  render,
  // screen,
  // waitForElementToBeRemoved,
  // within,
} from '@testing-library/react';

// import userEvent from '@testing-library/user-event';
import { getByTestId } from '@testing-library/react';
import Categories from './Categories';

// expect(getByTestId('categories_heading')).toBeInTheDocument();
expect(getByTestId('categories_index')).toBeInTheDocument();
expect(getByTestId('categories_button_row')).toBeInTheDocument();
expect(getByTestId('categories_button_bunch_left')).toBeInTheDocument();
expect(getByTestId('categories_styled_button_edit')).toBeInTheDocument();
expect(getByTestId('categories_styled_button_back')).toBeInTheDocument();

test('queries for user role', async () => {
  render(<Categories />);


});


// https://epicreact.dev/how-to-test-react-use-effect/
// https://mswjs.io/docs/basics/request-matching