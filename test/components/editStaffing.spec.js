import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EditStaffing from '../../src/components/editStaffing';

// setup is a function, so that each test get its own state
const setup = () => {
  const employee = {
    loading: false,
    data: {
      name: 'test_employee_one'
    }
  };

  const tableData = {
    loading: false,
    data: {
      weeks: [
        {
          week: 1,
          year: 2016,
          total: 5
        }
      ],
      projects: [
        {
          id: 'TEST1000',
          name: 'test_project_one',
          days: [0]
        }
      ]
    }
  };

  const wrapper = shallow(
    <EditStaffing
      employee={employee}
      tableData={tableData}
      onChange={() => {}}
    />);

  return {
    employee,
    tableData,
    wrapper
  };
};

describe('<EditStaffing />-table', () => {
  it('contains name and year in headers', () => {
    const { wrapper } = setup();
    expect(wrapper.find('h1').text()).toContain('test_employee_one');
    expect(wrapper.find('h2').text()).toContain('2016');
  });
});
