/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { shallow } from 'enzyme';
import EnhancedAccordion from './EnhancedAccordion';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('EnhancedAccordion', () => {
  test('renders', () => {
    const wrapper = shallow(<EnhancedAccordion />);
    expect(wrapper).toMatchSnapshot();
  });
});