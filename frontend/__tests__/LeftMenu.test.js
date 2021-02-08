import React from 'react';
import Enzyme,{shallow,mount, configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LeftMenu} from '../src/Components/Home/LeftMenu.js';

Enzyme.configure({adapter: new Adapter()});

describe('LeftMenu.js',()=>{

  it('should be true',()=>{
    const foo=true;
    expect(foo).toBe(true);
  });

});