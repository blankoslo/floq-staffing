import expect from 'expect';
import * as Immutable from 'immutable';
import { getEmployee } from '../../src/selectors/employeeSelector';

const loading = { loading: true, data: null };

const defaultEmployees = {
  loading: false,
  data: new Immutable.Map([[1, {
    id: 1,
    first_name: 'John',
    last_name: 'Smith',
    date_of_employment: '2016-08-01',
    termination_date: null,
  }]])
};

describe('getEmployedWeeks(weeks, employee)', () => {
  it('Handle employeeId null', () => {
    expect(getEmployee(null, defaultEmployees)).toEqual(loading);
  });

  it('Handle employeeId NaN', () => {
    expect(getEmployee(NaN, defaultEmployees)).toEqual(loading);
  });

  it('Handle loading employees', () => {
    expect(getEmployee(1, loading)).toEqual(loading);
  });

  it('Handle empty employees', () => {
    expect(getEmployee(1, loading)).toEqual(loading);
  });

  it('Compare objects', () => {
    expect(getEmployee(1, defaultEmployees))
    .toEqual({
      loading: false,
      data: {
        id: 1,
        name: 'John Smith',
        date_of_employment: '2016-08-01',
        termination_date: null,
      }
    });
  });
});
