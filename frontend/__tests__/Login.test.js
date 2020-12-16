import React, {Component} from 'react';
import { render, screen,queryByAttribute, fireEvent,findByText, waitForNextUpdate, waitFor, waitForDomChange} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';

//Enzyme tests matchers
import { configure,shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
configure({ adapter: new Adapter() });

// jest-dom adds custom jest matchers for asserting on DOM nodes. expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

import Login from '../src/App';


let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


//run this for debugging
/*
test('check Login page error message', async () => {
  const {debug}=render(
    <MockedProvider>
      <Login/>
    </MockedProvider>

  );
  debug();
});
*/
/*
test('check Login page error message', async () => {
  const {getByPlaceholderText,getByTestId,debug}=render(
    <MockedProvider>
      <Login/>
    </MockedProvider>

  );
  const usernameInput=screen.getByTestId("username-textbox")
  const passwordInput=screen.getByTestId("password-textbox")
  const loginButton=screen.getByTestId("login-button")

  fireEvent.click(loginButton);
  //await waitFor(()=>{});
  await waitForDomChange();
  screen.getAllByText("Please fill all the fields");
});
*/

/*
test('check Login page Login correct', async () => {
  const {getByPlaceholderText,getByTestId,debug}=render(
    <MockedProvider>
      <Login/>
    </MockedProvider>

  );
  const usernameInput=screen.getByTestId("username-textbox")
  const passwordInput=screen.getByTestId("password-textbox")
  const loginButton=screen.getByTestId("login-button")

  
  //await waitFor(()=>{});
  
  
  fireEvent.change(usernameInput,{target:{value:"admin"}});
  fireEvent.change(passwordInput,{target:{value:"pw123"}});
  fireEvent.click(loginButton);
  await waitForDomChange();
  debug();
});
*/

it('can render and update a counter', async () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Login />,container);
  });
  const usernameInput=screen.getByTestId("username-textbox")
  const passwordInput=screen.getByTestId("password-textbox")
  const loginButton=screen.getByTestId("login-button")
  expect(usernameInput.value).toBe('');
  expect(passwordInput.value).toBe('');

  // Test second render and componentDidUpdate
  fireEvent.change(usernameInput,{target:{value:"admin"}});
  fireEvent.change(passwordInput,{target:{value:"pw123"}});
  fireEvent.click(loginButton);

  expect(usernameInput.value).toBe('admin');
  act(() => {
    loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  await waitForDomChange();

  const logoutButton=screen.getByTestId("logout-dropdown")

  expect(logoutButton).toBeTruthy();

  
});

