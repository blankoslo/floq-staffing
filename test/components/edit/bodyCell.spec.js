import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EditStaffingCell from '../../../src/components/edit/bodyCell';
import moment from 'moment';

// setup is a function, so that each test get its own state
const setup = () => {
  const actions = {
    onChange: expect.createSpy()
  };

  const startOfWeek = moment('2016-10-03');

  const wrapper = shallow(
    <EditStaffingCell
      value={2}
      weekSum={3}
      projectid={'TEST1000'}
      startOfWeek={startOfWeek}
      onChange={actions.onChange}
    />);

  return {
    actions,
    startOfWeek,
    wrapper
  };
};

describe('<StaffingEditBodyCell />', () => {
  it('contains input-field which triggers onChange with expected arguments', () => {
    const { wrapper, actions, startOfWeek } = setup();
    const valueUnderTest = 6;
    // The input-field's are on the form 'project.id-week.number'
    wrapper
      .find('input')
      .simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', startOfWeek, 4]);
  });
});
