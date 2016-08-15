import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EditStaffing from '../../../src/components/edit/index';
import * as Immutable from 'immutable';
import moment from 'moment';

// setup is a function, so that each test get its own state
const setup = () => {
  const employee = {
    name: 'test_employee_one'
  };

  const tableHeader = new Immutable.List(
    [{
      startOfWeek: moment('2016-01-04'),
      sum: 5
    }]);

  const tableBody = new Immutable.List(
    [{
      projectid: 'TEST1000',
      projectname: 'test_project_one',
      daysPerWeek: new Immutable.List([1])
    }]);

  const wrapper = shallow(
    <EditStaffing
      selectedYear={2016}
      employee={employee}
      tableHeader={tableHeader}
      tableBody={tableBody}
      onChange={() => {}}
    />);

  return {
    wrapper
  };
};

describe('<EditStaffing />-table', () => {
  it('contains name and year in headers', () => {
    const { wrapper } = setup();
    expect(wrapper.text()).toContain('test_employee_one');
    expect(wrapper.text()).toContain('2016');
  });
});
