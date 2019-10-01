import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { exportAllDeclaration } from '@babel/types';

it('renders without crashing', () => {
  shallow(<App />);
});