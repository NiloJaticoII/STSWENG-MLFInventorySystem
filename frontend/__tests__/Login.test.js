import React, {Component} from 'react';
import { render, screen, shallow,queryByAttribute, fireEvent,findByText, waitForNextUpdate, waitFor, waitForDomChange} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';

//Enzyme tests matchers
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

// jest-dom adds custom jest matchers for asserting on DOM nodes. expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

import Login from '../src/Components/Login/Login';


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




