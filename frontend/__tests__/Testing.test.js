import React from 'react';
import Enzyme,{shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../src/Components/Login/Login.js';
import loginController from '../../controllers/loginController.js'
Enzyme.configure({adapter: new Adapter()});
import sinon from 'sinon'

const mockTryGetValue = jest.fn(() => false);
const mockTrySetValue = jest.fn(); 
 
jest.mock(loginController.postLogin, () => ({   
  SaveToStorage: jest.fn().mockImplementation(() => ({
    tryGetValue: mockTryGetValue,
    trySetValue: mockTrySetValue,
  })), 
}));
describe('MyComponent', () => {
  it('should set storage on save button click', () => {
    mockTryGetValue.mockReturnValueOnce(true);
    const component = mount(<MyComponent />); 
    component.find('button#my-button-three').simulate('click');
    expect(mockTryGetValue).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
    component.unmount();   
  });    
});