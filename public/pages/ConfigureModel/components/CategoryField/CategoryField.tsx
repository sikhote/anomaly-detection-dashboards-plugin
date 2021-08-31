/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiText,
  EuiLink,
  EuiIcon,
  EuiFormRow,
  EuiComboBox,
  EuiCheckbox,
  EuiTitle,
  EuiCallOut,
  EuiSpacer,
} from '@elastic/eui';
import { Field, FieldProps, FormikProps } from 'formik';
import { get, isEmpty } from 'lodash';
import { BASE_DOCS_LINK } from '../../../../utils/constants';
import React, { useState, useEffect } from 'react';
import ContentPanel from '../../../../components/ContentPanel/ContentPanel';
import {
  isInvalid,
  getError,
  validateCategoryField,
} from '../../../../utils/utils';
import { ModelConfigurationFormikValues } from '../../models/interfaces';

interface CategoryFieldProps {
  isEdit: boolean;
  isHCDetector: boolean;
  categoryFieldOptions: string[];
  setIsHCDetector(isHCDetector: boolean): void;
  isLoading: boolean;
  formikProps: FormikProps<ModelConfigurationFormikValues>;
}

export function CategoryField(props: CategoryFieldProps) {
  const [enabled, setEnabled] = useState<boolean>(
    get(props, 'formikProps.values.categoryFieldEnabled', false)
  );
  const noCategoryFields = isEmpty(props.categoryFieldOptions);
  const convertedOptions = props.categoryFieldOptions.map((option: string) => {
    return {
      label: option,
    };
  });

  useEffect(() => {
    // only update this if we're editing and the detector has finally come
    if (props.isEdit) {
      setEnabled(props.isHCDetector);
    }
  }, [props.isHCDetector]);

  return (
    <ContentPanel
      title={
        <EuiTitle size="s" id={'categoryFieldTitle'}>
          <h2>Categorical fields </h2>
        </EuiTitle>
      }
      subTitle={
        <EuiText
          className="content-panel-subTitle"
          style={{ lineHeight: 'normal' }}
        >
          Split a single time series into multiple time series based on
          categorical fields. You can select up to 2.{' '}
          <EuiLink href={`${BASE_DOCS_LINK}/ad`} target="_blank">
            Learn more <EuiIcon size="s" type="popout" />
          </EuiLink>
        </EuiText>
      }
    >
      {noCategoryFields && !props.isLoading ? (
        <EuiCallOut
          data-test-subj="noCategoryFieldsCallout"
          title="There are no available category fields for the selected index"
          color="warning"
          iconType="alert"
          size="s"
        ></EuiCallOut>
      ) : null}
      {noCategoryFields ? <EuiSpacer size="m" /> : null}
      {props.isEdit ? (
        <EuiCallOut
          data-test-subj="categoryFieldReadOnlyCallout"
          title="Category fields cannot be changed once the detector is created"
          color="primary"
          iconType="iInCircle"
          size="s"
        ></EuiCallOut>
      ) : null}
      {props.isEdit ? <EuiSpacer size="m" /> : null}
      <Field
        name="categoryField"
        validate={enabled ? validateCategoryField : null}
      >
        {({ field, form }: FieldProps) => (
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <EuiCheckbox
                id={'categoryFieldCheckbox'}
                label="Enable categorical fields"
                checked={enabled}
                disabled={noCategoryFields || props.isEdit}
                onChange={() => {
                  if (!enabled) {
                    props.setIsHCDetector(true);
                  }
                  if (enabled) {
                    props.setIsHCDetector(false);
                    form.setFieldValue('categoryField', []);
                  }
                  setEnabled(!enabled);
                }}
              />
            </EuiFlexItem>
            {enabled && !props.isEdit ? (
              <EuiFlexItem>
                <EuiCallOut
                  data-test-subj="cannotEditCategoryFieldCallout"
                  title="Category fields cannot be changed once the detector is created. Please ensure that you select the fields necessary for your case."
                  color="warning"
                  iconType="alert"
                  size="s"
                ></EuiCallOut>
              </EuiFlexItem>
            ) : null}
            {enabled && !noCategoryFields ? (
              <EuiFlexItem>
                <EuiFormRow
                  label="Field"
                  isInvalid={isInvalid(field.name, form)}
                  error={getError(field.name, form)}
                  helpText={`You can only apply the categorical fields to the 'ip' and 'keyword' OpenSearch data types.`}
                >
                  <EuiComboBox
                    data-test-subj="categoryFieldComboBox"
                    id="categoryField"
                    placeholder="Select your categorical fields"
                    options={convertedOptions}
                    onBlur={() => {
                      form.setFieldTouched('categoryField', true);
                    }}
                    onChange={(options) => {
                      const selection = options.map((option) => option.label);
                      if (!isEmpty(selection)) {
                        if (selection.length <= 2) {
                          form.setFieldValue('categoryField', selection);
                        }
                      } else {
                        form.setFieldValue('categoryField', []);
                      }
                    }}
                    selectedOptions={
                      field.value
                        ? field.value.map((value: any) => {
                            return {
                              label: value,
                            };
                          })
                        : []
                    }
                    singleSelection={false}
                    isClearable={true}
                    isDisabled={props.isEdit}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            ) : null}
          </EuiFlexGroup>
        )}
      </Field>
    </ContentPanel>
  );
}