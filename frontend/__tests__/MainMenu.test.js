import React, {Component} from 'react';
import { render, screen, shallow,queryByAttribute } from '@testing-library/react';

//Enzyme tests matchers
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

// jest-dom adds custom jest matchers for asserting on DOM nodes. expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

import MainMenu from '../src/Components/Home/MainMenu';

test('renders MainMenu page', () => {
  const dom=render(<MainMenu />);
  const getById = queryByAttribute.bind(null, 'id');
  const linkElement = getById(dom.container,"artistsList");
  expect(linkElement).toBeInTheDocument();
});