/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { render, screen } from 'spec/helpers/testing-library';
import { extendedDayjs } from '@superset-ui/core/utils/dates';
import LastQueriedLabel from '.';

test('renders nothing when queriedDttm is null', () => {
  render(<LastQueriedLabel queriedDttm={null} />);
  expect(screen.queryByTestId('last-queried-label')).not.toBeInTheDocument();
});

test('renders nothing when the timestamp is invalid', () => {
  render(<LastQueriedLabel queriedDttm="not-a-real-date" />);
  expect(screen.queryByTestId('last-queried-label')).not.toBeInTheDocument();
});

test('renders the localized last queried time for a valid timestamp', () => {
  const queriedDttm = '2024-01-15T10:30:00Z';
  const expectedTime = extendedDayjs.utc(queriedDttm).local().format('L LTS');

  render(<LastQueriedLabel queriedDttm={queriedDttm} />);

  const label = screen.getByTestId('last-queried-label');
  expect(label).toBeInTheDocument();
  expect(label).toHaveTextContent(`Last queried at: ${expectedTime}`);
});
