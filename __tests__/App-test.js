/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MenuItem from '../components/MenuItem';

let menuItem = {
  name: 'da',
  price: '200',
  description: 'hej',
};

it('renders correctly', () => {
  const tree = renderer.create(<MenuItem menuItem={menuItem} />).toJSON();
  expect(tree).toMatchSnapshot();
});
