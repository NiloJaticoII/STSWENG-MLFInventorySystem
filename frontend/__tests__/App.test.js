import React, {Component} from 'react';
import { render, screen, shallow } from '@testing-library/react';

//Enzyme tests matchers
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

// jest-dom adds custom jest matchers for asserting on DOM nodes. expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

import App from '../src/App';

test('renders login page', () => {
  render(<App />);
  const linkElement = screen.getByText("username");
  expect(linkElement).toBeInTheDocument();
});
