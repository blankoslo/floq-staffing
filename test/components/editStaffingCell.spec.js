import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EditStaffingCell from '../../src/components/editStaffingCell';

// setup is a function, so that each test get its own state
const setup = () => {
  const actions = {
    onChange: expect.createSpy()
  };

  const wrapper = shallow(
    <EditStaffingCell
      value={2}
      colIndex={0}
      week={40}
      total={3}
      projectId={'TEST1000'}
      onChange={actions.onChange}
    />);

  return {
    actions,
    wrapper
  };
};

describe('<EditStaffingCell />-table', () => {
  it('contains input-field which triggers onChange with expected arguments', () => {
    const { wrapper, actions } = setup();
    const valueUnderTest = 6;
    // The input-field's are on the form 'project.id-week.number'
    wrapper.find('#field-TEST1000-40').simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', 40, 4]);
  });

  it('contains remove-button which triggers onChange when clicked with expected arguments', () => {
    const { wrapper, actions } = setup();
    wrapper.find('#remove-TEST1000-40').simulate('click');
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', 40, -1]);
  });

  it('contains add-button which triggers onChange when clicked with expected arguments', () => {
    const { wrapper, actions } = setup();
    wrapper.find('#add-TEST1000-40').simulate('click');
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', 40, 1]);
  });
});
