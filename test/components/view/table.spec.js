import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import StaffingViewTable from '../../../src/components/view/table';

// setup is a function, so that each test get its own state
const setup = () => {
  const wrapper = shallow(
    <StaffingViewTable
      employees={{}}
      weeks={[]}
    />);

  return {
    wrapper
  };
};

describe('<StaffingViewTable />', () => {
  // TODO: Probably unnecesarry ui-test. But keeping it as an example for now.
  it('Contains header and body', () => {
    const { wrapper } = setup();
    const table = wrapper.find('table');
    expect(table.find('#staffing-view-table-header')).toExist();
    expect(table.find('#staffing-view-table-body')).toExist();
  });
});
