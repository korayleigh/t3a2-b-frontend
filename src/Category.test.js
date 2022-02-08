import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Category from './category';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders user data', async () => {
  const fakeCategory = {
    name: 'Italian'
  };
  jest.spyOn(global, 'fetch').mockImplementation(() =>  {
    Promise.resolve({ 
      json: () => Promise.resolve(fakeCategory)   
    });
  });
  
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Category id="123" />, container);
  });

  expect(container.querySelector('name').textContent).toBe(fakeCategory.name);

  // remove the mock to ensure tests are completely isolated  global.fetch.mockRestore();
});
