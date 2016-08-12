import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EditStaffingCell from '../../../src/components/edit/cell';
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
      colIndex={0}
      startOfWeek={startOfWeek}
      total={3}
      projectId={'TEST1000'}
      onChange={actions.onChange}
    />);

  return {
    actions,
    startOfWeek,
    wrapper
  };
};

describe('<EditStaffingCell />-table', () => {
  it('contains input-field which triggers onChange with expected arguments', () => {
    const { wrapper, actions, startOfWeek } = setup();
    const valueUnderTest = 6;
    // The input-field's are on the form 'project.id-week.number'
    wrapper
      .find(`#field-TEST1000-${startOfWeek.format('YYYY-MM-DD')}`)
      .simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', startOfWeek, 4]);
  });

  it('contains remove-button which triggers onChange when clicked with expected arguments', () => {
    const { wrapper, actions, startOfWeek } = setup();
    wrapper
      .find(`#remove-TEST1000-${startOfWeek.format('YYYY-MM-DD')}`)
      .simulate('click');
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', startOfWeek, -1]);
  });

  it('contains add-button which triggers onChange when clicked with expected arguments', () => {
    const { wrapper, actions, startOfWeek } = setup();
    wrapper
      .find(`#add-TEST1000-${startOfWeek.format('YYYY-MM-DD')}`)
      .simulate('click');
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', startOfWeek, 1]);
  });
});
