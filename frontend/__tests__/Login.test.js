/*
import React from 'react';
import Enzyme,{shallow,mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Login} from '../src/Components/Login/Login.js';

Enzyme.configure({adapter: new Adapter()});

describe('Login.js',()=>{

  it('should be true',()=>{
    const foo=true;
    expect(foo).toBe(true);
  });
  
  it('show text boxes',()=>{
    const wrapper=shallow(<Login/>);
    const text=wrapper.find('#loginForm ');
    expect(text.text()).toBe('usernamepassword');

  });

  it('should click login',()=>{
    const wrapper=shallow(<Login/>);
    const button=wrapper.find('#loginButton');
    const username=wrapper.find('#userName');
    const password=wrapper.find('#password');
    expect(button.text()).toBe('usernamepassword');

  });

  it('can click on login', () => {
    render(<Login />);
    const linkElement = screen.getByText("username");
    expect(linkElement).toBeInTheDocument();
  });
  

});
*/
import React from 'react';
import Enzyme,{shallow,mount, configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../src/Components/Login/Login.js';

Enzyme.configure({adapter: new Adapter()});

describe('Login.js',()=>{

  it('should be true',()=>{
    const foo=true;
    expect(foo).toBe(true);
  });
  it("render login page",()=>{
    shallow(<Login/>);
  });
  it("render login page header",()=>{
    const wrapper=shallow(<Login/>);
    const header=(<label htmlFor="userName" className="font-weight-normal">username</label>);
    expect(wrapper.contains(header)).toEqual(true);
  });

});