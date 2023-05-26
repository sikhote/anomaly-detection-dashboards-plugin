/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import AddAnomalyDetector from '../CreateAnomalyDetector';
import { Formik } from 'formik';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AddAnomalyDetector', () => {
  test('renders', () => {
    const wrapper = shallow(<AddAnomalyDetector />);
    expect(wrapper).toMatchSnapshot();
  });
  test('show errors for empty detector name field', async () => {
    const { findByText } = render(
      <Formik initialValues={{ name: '' }} onSubmit={jest.fn()}>
        {() => (
          <div>
            <AddAnomalyDetector 
              embeddable={jest.fn()} 
              closeFlyout={jest.fn()} 
              mode={jest.fn()} 
              setMode={jest.fn()} 
              selectedDetector={jest.fn()}
              setSelectedDetector={jest.fn()}/>
          </div>
        )}
      </Formik>
    );
    expect(findByText('Required')).not.toBeNull();
  });
});


