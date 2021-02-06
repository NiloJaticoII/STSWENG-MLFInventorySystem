
/*
describe('renders login page', () => {
  it("render login page",()=>{
    shallow(<App/>);
  });
  it("render login page header",()=>{
    const wrapper=shallow(<App/>);
    const header=(<label htmlFor="userName" className="font-weight-normal">username</label>);
    expect(wrapper.contain(header)).toEqual(true);
  });
});
*/
import React from 'react';
import Enzyme,{shallow,mount, configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../src/Components/Login/Login.js';

Enzyme.configure({adapter: new Adapter()});
const mockTryGetValue = jest.fn(() => false);
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
  it("render login page submit",()=>{
    const wrapper=shallow(<Login/>);
    const button=wrapper.find('#loginButton');

    expect(mockTryGetValue).toHaveBeenCalled();

  });


});