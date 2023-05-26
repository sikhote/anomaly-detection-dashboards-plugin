/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { shallow } from 'enzyme';
import MinimalAccordion from './MinimalAccordion';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('MinimalAccordion', () => {
  test('renders', () => {
    const wrapper = shallow(<MinimalAccordion />);
    expect(wrapper).toMatchSnapshot();
  });
});