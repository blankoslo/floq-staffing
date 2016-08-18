import expect from 'expect';
import moment from 'moment';
import * as Immutable from 'immutable';
import { getEmployedWeeks } from '../../src/selectors/employedWeeksSelector';

const weeks = new Immutable.Set([moment('2016-07-25'), moment('2016-08-01')]);

const employee = {
  loading: false,
  data: {
    date_of_employment: '2016-08-02',
    termination_date: null
  }
};

describe('getEmployedWeeks(weeks, employee)', () => {
  it('Employee was employed in week 2016-08-01', () => {
    expect(getEmployedWeeks(weeks, employee).data.has('2016-08-01')).toBeTruthy();
  });

  it('Employee was not employed in week 2016-07-25', () => {
    expect(getEmployedWeeks(weeks, employee).data.has('2016-07-25')).toBeFalsy();
  });
});
