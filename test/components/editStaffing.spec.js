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
          year: 2016
        },
        {
          week: 2,
          year: 2016
        },
        {
          week: 3,
          year: 2016
        }
      ],
      projects: [
        {
          id: 'TEST1000',
          name: 'test_project_one',
          days: [0, 1, 2]
        },
        {
          id: 'TEST1001',
          name: 'test_project_two',
          days: [5, 2, 6]
        },
        {
          id: 'TEST1002',
          name: 'test_project_two',
          days: [2, 0, 5]
        }
      ]
    }
  };

  const actions = {
    onChange: expect.createSpy()
  };

  const wrapper = shallow(
    <EditStaffing
      employee={employee}
      tableData={tableData}
      onChange={actions.onChange}
    />);

  return {
    employee,
    tableData,
    actions,
    wrapper
  };
};

describe('<EditStaffing />-table', () => {
  it('contains input-field which triggers onChange with expected arguments', () => {
    const { wrapper, actions } = setup();
    const valueUnderTest = 3;
    // The input-field's are on the form 'project.id-week.number'
    wrapper.find('#field-TEST1000-1').simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['TEST1000', 1, valueUnderTest]);
  });
});
