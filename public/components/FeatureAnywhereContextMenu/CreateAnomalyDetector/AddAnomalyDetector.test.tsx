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
import { Provider } from 'react-redux';
import configureStore from '../../../redux/configureStore'

const store = configureStore();

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

Enzyme.configure({ adapter: new Adapter() });

describe('AddAnomalyDetector', () => {
  test('renders', () => {
    const wrapper = shallow(
      <ReduxProvider>
        <AddAnomalyDetector />
      </ReduxProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('show errors for empty detector name field', async () => {
    const { findByText } = render(
      <ReduxProvider>
        <Formik initialValues={{ name: '' }} onSubmit={jest.fn()}>
          {() => (
            <div>
              <AddAnomalyDetector
                embeddable={jest.fn()}
                closeFlyout={jest.fn()}
                mode={jest.fn()}
                setMode={jest.fn()}
                selectedDetector={jest.fn()}
                setSelectedDetector={jest.fn()}
              />
            </div>
          )}
        </Formik>
      </ReduxProvider>
    );
    expect(findByText('Required')).not.toBeNull();
  });
});
