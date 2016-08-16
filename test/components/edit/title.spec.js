import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EditStaffing from '../../../src/components/edit/title';

// setup is a function, so that each test get its own state
const setup = () => {
  const wrapper = shallow(
    <EditStaffing
      onForwardClick={() => {}}
      onBackClick={() => {}}
      selectedYear={2016}
      employeeName={'test_employee_one'}
    />);

  return {
    wrapper
  };
};

describe('<StaffingEditTitle />', () => {
  it('contains name and year in headers', () => {
    const { wrapper } = setup();
    expect(wrapper.text()).toContain('test_employee_one');
    expect(wrapper.text()).toContain('2016');
  });
});
